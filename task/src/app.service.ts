import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PROCESS_EXPORT, PROCESS_EXPORT_USERS } from './app.constants';

@Injectable()
export class AppService {
  constructor(@InjectQueue(PROCESS_EXPORT) private queue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processExportUsers(message: string) {
    await this.queue.add(PROCESS_EXPORT_USERS, {
      text: message,
    });
  }
}
