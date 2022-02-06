import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { CONFIRM_REGISTRATION, MAIL_QUEUE } from './app.constants';

@Injectable()
export class AppService {
  private readonly _logger = new Logger(AppService.name);

  constructor(@InjectQueue(MAIL_QUEUE) private readonly _mailQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async sendConfirmationEmail(recipient: string): Promise<void> {
    try {
      await this._mailQueue.add(CONFIRM_REGISTRATION, {
        recipient,
      });
    } catch (error) {
      this._logger.error(
        `Error queueing registration email to user ${recipient}`,
      );
    }
  }
}
