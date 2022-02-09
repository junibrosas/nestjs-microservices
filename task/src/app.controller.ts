import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern({ cmd: 'queue-process-export-users' })
  sendMailExportedUsers() {
    this.appService.processExportUsers('example');
    return 'roger';
  }
}
