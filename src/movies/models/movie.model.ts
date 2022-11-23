import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Director } from './director.model';

@ObjectType()
export class Movie {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Director)
  director: Director;
}
