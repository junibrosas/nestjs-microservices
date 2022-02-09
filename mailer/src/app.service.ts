import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { MAIL_QUEUE, MAIL_QUEUE_EXPORTED_USERS } from './app.constants';

@Injectable()
export class AppService {
  private readonly _logger = new Logger(AppService.name);

  constructor(@InjectQueue(MAIL_QUEUE) private readonly _mailQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async sendExportedUsersMail(
    recipient: string,
  ): Promise<{ recipient: string }> {
    try {
      await this._mailQueue.add(MAIL_QUEUE_EXPORTED_USERS, { recipient });
    } catch (error) {
      this._logger.error(
        `Error queueing export users email to user ${recipient}`,
      );
    }

    return { recipient };
  }
}
