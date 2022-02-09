import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('MAILER_SERVICE') private mailerClient: ClientProxy,
    @Inject('QUEUE_SERVICE') private queueClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    // Connect your client to the redis server on startup.
    await this.mailerClient.connect();
    await this.queueClient.connect();
  }

  async getSend() {
    const recipient = 'junibrosas@gmail.com';
    this.mailerClient.emit({ cmd: 'mailer-send-exported-users' }, recipient);
    this.queueClient.emit({ cmd: 'queue-process-export-users' }, recipient);
  }
}
