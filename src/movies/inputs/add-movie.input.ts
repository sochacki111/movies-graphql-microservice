import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmptyObject, MaxLength } from 'class-validator';

@InputType()
export class AddMovieInput {
  @Field()
  @MaxLength(255)
  title: string;

  @IsNotEmptyObject()
  @Field()
  directorId: number;
}
