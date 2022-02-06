import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailProcessor } from './app.processor';
import { MAIL_QUEUE } from './app.constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailgunModule.forAsyncRoot({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          username: configService.get('EMAIL_USERNAME'),
          key: configService.get('EMAIL_API_KEY'),
        };
      },
    }),
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
  ],
  controllers: [AppController],
  providers: [MailProcessor, AppService],
})
export class AppModule {}
