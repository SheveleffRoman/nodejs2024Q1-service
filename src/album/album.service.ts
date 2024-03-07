import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/database/db-service';
import { Album } from './entities/album.entity';
import { v4 as uuid } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: uuid(),
      ...createAlbumDto,
    };
    const newAlbum = this.dbService.addAlbum(album);
    return newAlbum;
  }

  findAll() {
    return this.dbService.getAllAlbums();
  }

  findOne(id: string) {
    const album = this.dbService.getAlbumById(id);
    if (!album)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    if (!album)
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);

    if (!updateAlbumDto) {
      throw new HttpException('Invalid dto format', HttpStatus.BAD_REQUEST);
    }

    const updatedAlbum = {
      ...album,
      ...updateAlbumDto,
    };
    this.dbService.updateAlbum(updatedAlbum);
    return updatedAlbum;
  }

  remove(id: string) {
    const album = this.findOne(id);
    if (!album) {
      throw new HttpException("Album doesn't exist", HttpStatus.NOT_FOUND);
    }

    this.dbService.deleteAlbum(id);

    const tracks = this.dbService.getAllTracks();
    const filtered = tracks.filter((track) => track.albumId === id);
    filtered.forEach((track) => {
      this.dbService.updateTrack({ ...track, albumId: null });
    });

    if (this.dbService.isAlbumInFavorites(album.id) === true) {
      this.dbService.deleteAlbumFromFavorites(album.id);
    }

    return album;
  }
}
