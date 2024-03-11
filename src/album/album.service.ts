import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/database/db.service';
import { v4 as uuid } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      ...createAlbumDto,
      id: uuid(),
    };
    this.dbService.addAlbum(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.dbService.getAllAlbums();
  }

  async findOne(id: string) {
    const album = await this.dbService.getAlbumById(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };
    this.dbService.updateAlbum(updatedAlbum);
    return updatedAlbum;
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    this.dbService.deleteAlbum(id);

    const tracks = await this.dbService.getAllTracks();
    const correspondingTracks = tracks.filter((track) => track.albumId === id);
    correspondingTracks.map((tracks) =>
      this.dbService.updateTrack({ ...tracks, albumId: null }),
    );

    this.dbService.deleteAlbumFromFavorites(id);

    return album;
  }
}
