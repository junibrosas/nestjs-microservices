import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('mailer-send-exported-users')
  handleSendExportedUsers() {
    this.appService.sendExportedUsersMail('junibrosas@gmail.com');
  }

  @EventPattern('mailer-send-processed-data')
  handleSendProcessedData() {
    console.warn('Processed data link sent as email message.');
  }

  @EventPattern('send-user-notification')
  handleSendUserNotification(data) {
    console.warn(data);
    console.warn('send user notification...');
  }
}
