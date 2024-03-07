import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from 'src/database/db-service';
import { Track } from './entities/track.entity';
import { v4 as uuid } from 'uuid';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: uuid(),
      ...createTrackDto,
    };
    return this.dbService.addTrack(track);
  }

  findAll() {
    return this.dbService.getAllTracks();
  }

  async findOne(id: string) {
    const track = this.dbService.getTrackById(id);
    if (!track)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    return this.dbService.getTrackById(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    if (!track)
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);

    if (!updateTrackDto) {
      throw new HttpException('Invalid dto format', HttpStatus.BAD_REQUEST);
    }

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };
    this.dbService.updateTrack(updatedTrack);
    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    if (!track)
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    this.dbService.deleteTrack(id);

    // this.dbService.deleteTrackFromFavorites(id);
    return track;
  }
}
