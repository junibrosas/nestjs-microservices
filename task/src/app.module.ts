import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROCESS_EXPORT } from './app.constants';
import { AppController } from './app.controller';
import { ExportProcessor } from './app.processor';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from './models/user.model';
import { UserService } from './services/user.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAILER2_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: PROCESS_EXPORT,
    }),
    MongooseModule.forRoot('mongodb://localhost/alaya'),
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
  ],
  controllers: [AppController],
  providers: [AppService, ExportProcessor, UserService],
})
export class AppModule {}
