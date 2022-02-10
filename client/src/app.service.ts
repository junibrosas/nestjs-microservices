import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('MAILER_SERVICE') private mailerClient: ClientProxy,
    @Inject('TASK_SERVICE') private taskClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    // Connect your client to the redis server on startup.
    await this.mailerClient.connect();
    await this.taskClient.connect();
  }

  async getSend() {
    const recipient = 'junibrosas@gmail.com';
    this.mailerClient.emit('mailer-send-exported-users', recipient);
    this.taskClient.emit('queue-process-export-users', recipient);
  }
}
