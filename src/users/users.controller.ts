import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { STATUS_CODE } from 'src/helpers/statusCode';
import response from 'src/helpers/response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      
      this.usersService
        .create(createUserDto)
        .then(async (user) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `user registration Successfully`,
                { user },
                STATUS_CODE.success,
                true,
              ),
            );
        })
        .catch(async (err) => {
          Logger.error(err);
          return res
            .status(STATUS_CODE.badRequest)
            .json(
              await response(
                `user registration Failed`,
                {},
                STATUS_CODE.badRequest,
                false,
                err,
              ),
            );
        });
    } catch (error) {
      Logger.error(error);
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          await response(
            `user registration Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }
  @Post('login')
  async login(@Body() createUserDto: LoginDto, @Res() res: Response) {
    try {
      
      this.usersService
        .login(createUserDto)
        .then(async (user) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `user login Successfully`,
                { user },
                STATUS_CODE.success,
                true,
              ),
            );
        })
        .catch(async (err) => {
          Logger.error(err);
          return res
            .status(STATUS_CODE.badRequest)
            .json(
              await response(
                `user login Failed`,
                {},
                STATUS_CODE.badRequest,
                false,
                err,
              ),
            );
        });
    } catch (error) {
      Logger.error(error);
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          await response(
            `user login Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }
}
