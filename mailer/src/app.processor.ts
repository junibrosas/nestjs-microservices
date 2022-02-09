import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { Job } from 'bull';
import { MAIL_QUEUE, MAIL_QUEUE_EXPORTED_USERS } from './app.constants';

/**
 * This class define methods that either process jobs added into the queue, or listen for events on the queue.
 */
interface IConfirmRegistrationJob {
  recipient: string;
}

@Injectable()
@Processor(MAIL_QUEUE)
export class MailProcessor {
  private readonly _logger = new Logger(MailProcessor.name);

  constructor(
    private readonly _mailgunService: MailgunService,
    private readonly _configService: ConfigService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public onError(job: Job<any>, error: any) {
    this._logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  // @Process(CONFIRM_REGISTRATION)
  // public async confirmRegistration(job: Job<IConfirmRegistrationJob>) {
  //   this._logger.log(
  //     `Sending confirm registration email to '${job.data.recipient}'`,
  //   );

  //   try {
  //     const data = {
  //       from: 'Excited User <me@samples.mailgun.org>',
  //       to:
  //         this._configService.get('EMAIL_AUTHORIZED_RECIPIENT') ||
  //         job.data.recipient,
  //       subject: 'Attack on titan',
  //       text: 'Rumbling, rumbling, rumbling, its coming!',
  //     };

  //     const message = await this._mailgunService.createEmail(
  //       this._configService.get('EMAIL_DOMAIN'),
  //       data,
  //     );

  //     this._logger.log(message);
  //   } catch (error) {
  //     this._logger.error(
  //       `Failed to send confirmation email to '${job.data.recipient}'`,
  //     );
  //   }
  // }

  @Process(MAIL_QUEUE_EXPORTED_USERS)
  public async exportedUsers(job: Job<{ recipient: string }>) {
    console.warn(job.data.recipient);
  }
}
