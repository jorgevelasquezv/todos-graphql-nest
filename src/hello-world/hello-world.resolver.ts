import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'Returns a greeting message.',
    name: 'helloWorld',
  })
  helloWorld(): string {
    return 'Hello, World!';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomNumberFromZeroTo',
    description:
      'Returns a random number from 0 to the specified maximum value.',
  })
  getRandomNumberFromZeroTo(
    @Args('max', { nullable: true, type: () => Int, defaultValue: 10 })
    max: number = 10,
  ): number {
    return Math.floor(Math.random() * max);
  }
}
