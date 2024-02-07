import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class StatusArgs {
  @Field(() => Boolean, { description: 'Status of the todo', nullable: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
