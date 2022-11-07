import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field((type) => Int)
  id: number;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;
}
