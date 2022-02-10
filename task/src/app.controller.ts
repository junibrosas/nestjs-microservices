import { Controller, Get } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  EventPattern,
  Transport,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  client: ClientProxy;

  constructor(private readonly appService: AppService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/process')
  async sendMail() {
    this.client.emit('mailer-send-processed-data', 'junibrosas');
    return 'Attached process data link to email message...';
  }

  @EventPattern('task-process-export-users')
  sendMailExportedUsers() {
    this.appService.processExportUsers('example');
  }
}
