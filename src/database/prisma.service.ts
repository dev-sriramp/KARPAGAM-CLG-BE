import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient, user } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  create: any;
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params: Prisma.MiddlewareParams, next) => {
      if (
        (params.action === 'create' || params.action === 'update') &&
        params.model === 'user'
      ) {
        if (params.args.data.password) {
          const user: user = params.args.data;
          const hash: string = await bcrypt.hash(
            user.password,
            Number(process.env.ROUND),
          );
          user.password = hash;
          params.args.data = user;
        }
      }
      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
