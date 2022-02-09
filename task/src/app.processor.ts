import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PROCESS_EXPORT, PROCESS_EXPORT_USERS } from './app.constants';

@Processor(PROCESS_EXPORT)
export class ExportProcessor {
  private readonly _logger = new Logger(ExportProcessor.name);

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

  @Process(PROCESS_EXPORT_USERS)
  readOperationJob(job: Job<unknown>) {
    console.log(job.data);
  }
}
