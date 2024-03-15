import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { DbService } from 'src/database/db.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  async create(createTrackDto: CreateTrackDto) {
    const album = createTrackDto.albumId
      ? await this.dbService.album.findUnique({
          where: { id: createTrackDto.albumId },
        })
      : null;

    if (!album) {
      delete createTrackDto.albumId;
    }

    const artist = createTrackDto.artistId
      ? await this.dbService.artist.findUnique({
          where: { id: createTrackDto.artistId },
        })
      : null;

    if (!artist) {
      delete createTrackDto.artistId;
    }

    return this.dbService.track.create({ data: createTrackDto });
  }

  async findAll() {
    return this.dbService.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.dbService.track.findUnique({
      where: { id: id },
    });

    if (!track) throw new NotFoundException();

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    this.dbService.track.update({
      where: { id: updatedTrack.id },
      data: updatedTrack,
    });

    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    this.dbService.track.delete({
      where: { id: track.id },
    });

    return track;
  }
}
