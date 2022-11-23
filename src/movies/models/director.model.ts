import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Director {
  @Field((type) => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  // @Field((type) => [Movie])
  // movies: Movie[];
}
