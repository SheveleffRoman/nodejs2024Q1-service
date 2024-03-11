import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DbService } from 'src/database/db.service';

@Injectable()
export class FavsService {
  constructor(private dbService: DbService) {}

  async findAll() {
    const favorites = await this.dbService.getAllFavorites();

    const tracks = await Promise.all(
      favorites.tracks.map(async (id) => await this.dbService.getTrackById(id)),
    ).then((result) => result.filter((el) => Boolean(el)));

    const albums = await Promise.all(
      favorites.albums.map(async (id) => await this.dbService.getAlbumById(id)),
    ).then((result) => result.filter((el) => Boolean(el)));

    const artists = await Promise.all(
      favorites.artists.map(
        async (id) => await this.dbService.getArtistById(id),
      ),
    ).then((result) => result.filter((el) => Boolean(el)));

    return {
      tracks,
      albums,
      artists,
    };
  }

  async addTrack(id: string) {
    const track = await this.dbService.getTrackById(id);
    if (track) {
      this.dbService.addTrackToFavorites(id);
      return this.dbService.getTrackById(id);
    }
    throw new UnprocessableEntityException();
  }

  removeTrack(id: string) {
    this.dbService.deleteTrackFromFavorites(id);
    return 'Track removed';
  }

  async addAlbum(id: string) {
    const album = await this.dbService.getAlbumById(id);
    if (album) {
      this.dbService.addAlbumToFavorites(id);
      return this.dbService.getAlbumById(id);
    }
    throw new UnprocessableEntityException();
  }

  removeAlbum(id: string) {
    this.dbService.deleteAlbumFromFavorites(id);
    return 'Album removed';
  }

  async addArtist(id: string) {
    const artist = await this.dbService.getArtistById(id);
    if (artist) {
      this.dbService.addArtistToFavorites(id);
      return this.dbService.getArtistById(id);
    }
    throw new UnprocessableEntityException();
  }

  removeArtist(id: string) {
    this.dbService.deleteArtistFromFavorites(id);
    return 'Artist removed';
  }
}
