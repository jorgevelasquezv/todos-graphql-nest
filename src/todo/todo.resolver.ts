import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { UpdateTodoInput, CreateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.getToDos(statusArgs);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.getTodoById(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  create(
    @Args('createTodoInput', { type: () => CreateTodoInput })
    createTodoInput: CreateTodoInput,
  ): Todo {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTodoInput', { type: () => UpdateTodoInput })
    updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(id, updateTodoInput);
  }

  @Mutation(() => String)
  remove(@Args('id', { type: () => Int }) id: number): string {
    return this.todoService.remove(id);
  }

  @Query(() => Int, { name: 'totalTodos' })
  totalToDos(): number {
    return this.todoService.totalToDos;
  }

  @Query(() => Int, { name: 'completedTodos' })
  completedToDos(): number {
    return this.todoService.completedToDos;
  }

  @Query(() => Int, { name: 'pendingTodos' })
  pendingToDos(): number {
    return this.todoService.pendingToDos;
  }

  @Query(() => AggregationsType, { name: 'aggregations' })
  aggregations(): AggregationsType {
    return {
      total: this.todoService.totalToDos,
      completed: this.todoService.completedToDos,
      pending: this.todoService.pendingToDos,
      totalToDosCompleted: this.todoService.completedToDos,
    };
  }
}
