import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { AddMovieInput } from './inputs/add-movie.input';
import { Movie } from './models/movie.model';
import { MoviesService } from './movies.service';

@Resolver((of) => Movie)
export class MoviesResolver {
  constructor(
    private moviesService: MoviesService,
    @Inject('MOVIES_SEND_SERVICE') private moviesSendService: ClientProxy,
  ) {}

  @Query(() => [Movie], { name: 'movies' })
  async findAll(): Promise<Movie[]> {
    const movies = await this.moviesService.findAll();

    console.log('movies', movies);
    return movies;
  }

  @Mutation(() => Boolean)
  async add(
    @Args('addMovieInput') addMovieInput: AddMovieInput,
  ): Promise<boolean> {
    this.moviesSendService.emit('added_movie', addMovieInput);
    return true;
  }
}
