import { Controller, Get } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  EventPattern,
  MessagePattern,
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

  @Get('/send')
  async sendMail() {
    this.client.emit({ cmd: 'mailer-send-sample' }, 'junibrosas');
    return 'sending...';
  }

  @EventPattern({ cmd: 'queue-process-export-users' })
  sendMailExportedUsers() {
    this.appService.processExportUsers('example');
    return 'roger';
  }
}
