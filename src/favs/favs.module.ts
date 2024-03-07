import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DbService } from 'src/database/db-service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, DbService]
})
export class FavsModule {}
