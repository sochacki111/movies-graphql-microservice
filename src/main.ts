import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const rmqUser = configService.get('RMQ_USER');
  const rmqPassword = configService.get('RMQ_PASSWORD');
  const rmqHost = configService.get('RMQ_HOST');
  const rmqQueueName = configService.get('RMQ_QUEUE_NAME');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rmqUser}:${rmqPassword}@${rmqHost}`],
      queue: rmqQueueName,
      queueOptions: {
        durable: true,
      },
      persistent: true,
    },
  });

  app.startAllMicroservices();

  await app
    .listen(configService.get('PORT'))
    .then(() => console.log('movies-microservices v2'));
}
bootstrap();
