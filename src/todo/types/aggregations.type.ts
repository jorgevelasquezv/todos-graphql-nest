import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Aggregations type' })
export class AggregationsType {
  @Field(() => Int, { description: 'Total of aggregations' })
  total: number;

  @Field(() => Int, { description: 'Number of pending aggregations' })
  pending: number;

  @Field(() => Int, { description: 'Number of completed aggregations' })
  completed: number;

  @Field(() => Int, {
    description: 'Number of total todos',
    deprecationReason: 'Use total instead',
  })
  totalToDosCompleted: number;
}
