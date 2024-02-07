import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { UpdateTodoInput, CreateTodoInput, StatusArgs } from './dto';

@Injectable()
export class TodoService {
  private toDos: Todo[] = [
    {
      id: 1,
      title: 'Create NestJS app',
      description: 'Create a new NestJS app with GraphQL',
      done: false,
    },
    {
      id: 2,
      title: 'Create a new module',
      description: 'Create a new module with a resolver and a service',
      done: false,
    },
    {
      id: 3,
      title: 'Create a new entity',
      description: 'Create a new entity for the module',
      done: true,
    },
    {
      id: 4,
      title: 'Create a new resolver',
      description: 'Create a new resolver for the module',
      done: true,
    },
    {
      id: 5,
      title: 'Create a new service',
      description: 'Create a new service for the module',
      done: false,
    },
  ];

  get totalToDos(): number {
    return this.toDos.length;
  }

  get completedToDos(): number {
    return this.getToDos({ status: true }).length;
  }

  get pendingToDos(): number {
    return this.getToDos({ status: false }).length;
  }

  getToDos(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status !== undefined)
      return this.toDos.filter(({ done }) => done === status);
    return this.toDos;
  }

  getTodoById(id: number): Todo {
    const todo = this.toDos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const newTodo = {
      id: this.toDos.length + 1,
      ...createTodoInput,
      done: false,
    };
    this.toDos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodoInput: UpdateTodoInput): Todo {
    const todo = this.getTodoById(id);
    Object.assign(todo, updateTodoInput);
    return todo;
  }

  remove(id: number): string {
    this.getTodoById(id);

    this.toDos = this.toDos.filter((todo) => todo.id !== id);
    return `Todo with id ${id} has been removed`;
  }
}
