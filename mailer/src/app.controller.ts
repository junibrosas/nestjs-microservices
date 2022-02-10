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

  @EventPattern({ cmd: 'mailer-send-exported-users' })
  sendMailExportedUsers() {
    this.appService.sendExportedUsersMail('junibrosas@gmail.com');
    return 'roger';
  }

  @EventPattern({ cmd: 'mailer-send-sample' })
  sendSampleMail() {
    console.warn('warning...');
  }

  @EventPattern('send-user-notification')
  sendusernotify(data) {
    console.warn(data);
    console.warn('send user notification...');
  }
}
