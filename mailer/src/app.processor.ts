import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { Job } from 'bull';
import { MAIL_QUEUE, CONFIRM_REGISTRATION } from './app.constants';

interface IConfirmRegistrationJob {
  recipient: string;
}

@Processor(MAIL_QUEUE)
export class MailProcessor {
  private readonly _logger = new Logger(MailProcessor.name);

  constructor(
    private readonly _mailgunService: MailgunService,
    private readonly _configService: ConfigService,
  ) {}

  @Process(CONFIRM_REGISTRATION)
  public async confirmRegistration(job: Job<IConfirmRegistrationJob>) {
    this._logger.log(
      `Sending confirmation registration email to ${job.data.recipient}`,
    );
  }
}
