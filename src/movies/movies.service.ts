import { Injectable } from '@nestjs/common';
import { AddMovieInput } from './inputs/add-movie.input';
import { Movie } from './models/movie.model';

@Injectable()
export class MoviesService {
  create(addMovieInput: AddMovieInput) {
    return 'This action adds a new movie';
  }

  async findAll(): Promise<Movie[]> {
    return [
      {
        id: 1,
        title: 'test',
        director: { id: 1, firstName: 'hello', lastName: 'world' },
      },
      {
        id: 2,
        title: 'test2',
        director: { id: 2, firstName: 'hello2', lastName: 'world2' },
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
