import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuid } from 'uuid';
import { DbService } from 'src/database/db.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuid(),
      ...createTrackDto,
    };
    return this.dbService.addTrack(newTrack);
  }

  findAll() {
    return this.dbService.getAllTracks();
  }

  async findOne(id: string) {
    const track = await this.dbService.getTrackById(id);

    if (!track) throw new NotFoundException();

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    this.dbService.updateTrack(updatedTrack);

    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    this.dbService.deleteTrack(id);

    this.dbService.deleteTrackFromFavorites(id);

    return track;
  }
}
