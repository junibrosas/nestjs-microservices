import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Task');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    name: 'TASK_SERVICE',
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  });

  app.listen().then(() => logger.log('Task microservice is listening...'));
}
bootstrap();
