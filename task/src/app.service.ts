import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Queue } from 'bull';
import { PROCESS_EXPORT, PROCESS_EXPORT_USERS } from './app.constants';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue(PROCESS_EXPORT) private queue: Queue,
    @Inject('MAILER2_SERVICE') private mailerClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    // Connect your client to the redis server on startup.
    await this.mailerClient.connect();
  }

  getHello(): string {
    return 'Hello World!!';
  }

  async processExportUsers(message: string) {
    await this.queue.add(PROCESS_EXPORT_USERS, {
      text: message,
    });
  }

  async sendMail() {
    const recipient = 'junibrosas@gmail.com';
    this.mailerClient.emit('mailer-send-sample', recipient);
  }
}
