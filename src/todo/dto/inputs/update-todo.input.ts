import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => String, { description: 'Title of the todo', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @IsOptional()
  title?: string;

  @Field(() => String, {
    description: 'Description of the todo',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { description: 'Is the todo done?', nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
