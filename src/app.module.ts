import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import Joi from 'joi';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule as MoviesModule } from './movies/movies.module';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GRAPHQL_PLAYGROUND: Joi.number(),
        PORT: Joi.number().default(3001),
      }),
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MoviesService],
})
export class AppModule {}
