import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbService } from 'src/database/db-service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, DbService],
})
export class AlbumModule {}
