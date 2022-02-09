import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Mailer');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    name: 'MAILER_SERVICE',
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  });

  app.listen().then(() => logger.log('Mailer microservice is listening...'));
}

bootstrap();
