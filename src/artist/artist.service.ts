import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/database/db.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.dbService.artist.create({ data: createArtistDto });
  }

  findAll() {
    return this.dbService.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.dbService.artist.findUnique({
      where: { id: id },
    });

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    return this.dbService.artist.update({
      where: { id: updatedArtist.id },
      data: updatedArtist,
    });
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    return this.dbService.artist.delete({
      where: { id: artist.id },
    });
  }
}
