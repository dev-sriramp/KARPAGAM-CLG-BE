import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import response from 'src/helpers/response';
import { STATUS_CODE } from 'src/helpers/statusCode';
import { TodoService } from './todo.service';
import { TodoGet, TodoListDto, CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import listParser, { prismaFilterOptions } from 'src/helpers/objectParser';
// @UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      this.todoService
        .create(createTodoDto)
        .then(async (todo) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Todo creatino Successfully`,
                { todo },
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
                `Todo Creation Failed`,
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
            `Todo Creation Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }

  @Post('list')
  async findAll(@Body() todo: TodoListDto, @Res() res: Response) {
    try {
      let payload: prismaFilterOptions = listParser(todo);
      this.todoService
        .findAll(payload)
        .then(async (todo) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Todo List Successfully`,
                { todo },
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
                `Todo List Failed`,
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
            `Todo List Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }

 

  @Patch(':uuid')
  async update(
    @Param() uuid: TodoGet,
    @Body() updateTodo: UpdateTodoDto,
    @Res() res: Response,
  ) {
    try {
      this.todoService
        .update(uuid.uuid, updateTodo)
        .then(async (todo) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Todo List Successfully`,
                { todo },
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
                `Todo Update Failed`,
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
            `Todo Update Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
    // return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':uuid')
  async remove(@Param() uuid: TodoGet, @Res() res: Response) {
    try {
      this.todoService
        .remove(uuid.uuid)
        .then(async (todo) => {
          return res
            .status(STATUS_CODE.success)
            .json(
              await response(
                `Todo Deleted Successfully`,
                { todo },
                STATUS_CODE.success,
                true,
                '',
              ),
            );
        })
        .catch(async (err) => {
          Logger.error(err);
          return res
            .status(STATUS_CODE.badRequest)
            .json(
              await response(
                `Todo List Failed`,
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
            `Todo delete Failed`,
            {},
            STATUS_CODE.internalServerError,
            false,
            error.message,
          ),
        );
    }
  }
}
