import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbService } from './database/db-service';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, TrackModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
