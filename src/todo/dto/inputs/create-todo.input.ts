import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Title of the todo' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @Field(() => String, { description: 'Description of the todo' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  description: string;
}
