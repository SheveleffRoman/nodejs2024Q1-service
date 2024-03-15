import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/database/db.service';
import { v4 as uuid } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const artist = createAlbumDto.artistId
      ? await this.dbService.artist.findUnique({
          where: { id: createAlbumDto.artistId },
        })
      : null;

    if (!artist) {
      delete createAlbumDto.artistId;
    }

    return this.dbService.album.create({ data: createAlbumDto });
  }

  findAll() {
    return this.dbService.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.dbService.album.findUnique({
      where: { id: id },
    });
    if (!album) throw new NotFoundException();
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    const updated = {
      ...album,
      ...updateAlbumDto,
    };

    return this.dbService.album.update({
      where: { id: album.id },
      data: updated,
    });
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    this.dbService.album.delete({
      where: { id: album.id },
    });

    return album;
  }
}
