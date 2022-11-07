import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  directorId: number;
}
