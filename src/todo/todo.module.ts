import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [PrismaModule],
})
export class TodoModule {}
