import { todo } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { prismaFilterOptions } from 'src/helpers/objectParser';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
@Injectable()
export class TodoService {
  constructor(private prismaClient: PrismaService) {}
  create(createTodo: CreateTodoDto) {
    return new Promise(async (resolve, reject) => {
      try {
        let todo = await this.prismaClient.todo.create({
          data: createTodo,
        });
        if (!todo) {
          return reject('Error While creating Todo');
        }
        return resolve(todo);
      } catch (error) {
        if (JSON.stringify(error.message).includes('Unique constraint')) {
          return reject('Todo Already Exists');
        }

        return reject('Unknown Error Occurred');
      }
    });
  }

  findAll(payload: prismaFilterOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        let todo: todo[] = await this.prismaClient.todo.findMany(
          payload,
        );
        let count = await this.prismaClient.todo.count({where:payload.where})
        if (!todo) {
          return reject('Error While retriving Todo');
        }
        return resolve({todo,count});
      } catch (error) {
        if (
          JSON.stringify(error.message).includes(
            '`include` or `select`, but not both at the same time',
          )
        ) {
          return reject('Use either select or include');
        }

        return reject(`${error.message}`);
      }
    });
  }

  findOne(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let todo: todo = await this.prismaClient.todo.findFirst({
          where: { id },
        });

        if (!todo) {
          return reject('Error While retriving Todo');
        }
        return resolve(todo);
      } catch (error) {
        if (
          JSON.stringify(error.message).includes(
            '`include` or `select`, but not both at the same time',
          )
        ) {
          return reject('Use either select or include');
        }

        return reject(`${error.message}`);
      }
    });
  }

  update(id: string, updateTodo: UpdateTodoDto) {
    return new Promise(async (resolve, reject) => {
      try {
        let todo: todo = await this.prismaClient.todo.update({
          where: { id },
          data: updateTodo,
        });

        if (!todo) {
          return reject('Todo Sucessfully Updated');
        }
        return resolve(todo);
      } catch (error) {
        if (
          JSON.stringify(error.message).includes('Record to update not found')
        ) {
          return reject('No Record Found');
        }

        return reject(`${error.message}`);
      }
    });
  }

  remove(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let todo: todo = await this.prismaClient.todo.update({
          where: { id },
          data: { status: false, deleted_at: new Date().toISOString() },
        });
        if (!todo) {
          return reject('Todo Sucessfully deleted');
        }
        return resolve(todo);
      } catch (error) {
        if (
          JSON.stringify(error.message).includes('Record to update not found')
        ) {
          return reject('No Record Found');
        }

        return reject(`${error.message}`);
      }
    });
  }
}
