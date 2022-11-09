import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';

@Module({
  imports: [ConfigModule],
  providers: [
    MoviesResolver,
    MoviesService,
    {
      provide: 'MOVIES_SEND_SERVICE',
      useFactory: (configService: ConfigService) => {
        const rmqUser = configService.get('RMQ_USER');
        const rmqPassword = configService.get('RMQ_PASSWORD');
        const rmqHost = configService.get('RMQ_HOST');
        const rmqQueueName = configService.get('RMQ_QUEUE_NAME');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${rmqUser}:${rmqPassword}@${rmqHost}`],
            queue: rmqQueueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class PostsModule {}
