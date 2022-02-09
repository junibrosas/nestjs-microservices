import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PROCESS_EXPORT } from './app.constants';
import { AppController } from './app.controller';
import { ExportProcessor } from './app.processor';
import { AppService } from './app.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: PROCESS_EXPORT,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ExportProcessor],
})
export class AppModule {}
