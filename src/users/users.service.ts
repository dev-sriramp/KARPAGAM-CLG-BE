import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaClient: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(createUserDto);
        
        let user:user = await this.prismaClient.user.create({
          data: createUserDto,
        });
        delete user.password
        resolve(user);
      } catch (error) {
        reject('error occurred');
      }
    });
  }
  async login(login: LoginDto) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!login.email_address) {
          reject('either provide email or mobile ');
        }
        let user: user;
        let regexNumber = /^\d+\.?\d*$/;
        if (regexNumber.test(login.email_address)) {
          user = await this.prismaClient.user.findFirst({
            where: {
              mobile_number: login.email_address,
            },
            include: { todo: true },
          });
        } else {
          user = await this.prismaClient.user.findFirst({
            where: {
              email_address: login.email_address,
            },
            include: { todo: true },
          });
        }
        const checkPassword = await bcrypt.compare(
          login.password,
          user.password,
        );
        if (!checkPassword) {
          return reject('Wrong Password!');
        } else {
          delete user.password;
          resolve(user);
        }
      } catch (error) {
        reject('error occurred');
      }
    });
  }
}
