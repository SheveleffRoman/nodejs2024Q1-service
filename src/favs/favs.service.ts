import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DbService } from 'src/database/db-service';

@Injectable()
export class FavsService {
  constructor(private dbService: DbService) {}

  async findAll() {
    const favs = await this.dbService.getAllFavorites();

    // get all non-null tracks by id
    const tracks = await Promise.all(
      favs.tracks.map(async (id) => await this.dbService.getTrackById(id)),
    ).then((result) => result.filter((el) => Boolean(el)));

    // get all non-null albums by id
    const albums = await Promise.all(
      favs.albums.map(async (id) => await this.dbService.getAlbumById(id)),
    ).then((result) => result.filter((el) => Boolean(el)));

    // get all non-null artists by id
    const artists = await Promise.all(
      favs.artists.map(async (id) => await this.dbService.getArtistById(id)),
    ).then((result) => result.filter((el) => Boolean(el)));

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrack(id: string) {
    const track = this.dbService.getTrackById(id);

    if (track) {
      const isAlreadyInFavorites = await this.dbService.isTrackInFavorites(id);

      if (!isAlreadyInFavorites) {
        this.dbService.addTrackToFavorites(id);
        return this.dbService.getTrackById(id);
      } else {
        throw new HttpException(
          'Track is already in favorites',
          HttpStatus.CREATED,
        );
      }
    } else {
      throw new HttpException("Track doesn't exist", HttpStatus.CREATED);
    }
  }

  removeTrack(id: string) {
    this.dbService.deleteTrackFromFavorites(id);
    return `Track with id ${id} was removed from favorites`;
  }

  async addAlbum(id: string) {
    const album = this.dbService.getAlbumById(id);

    if (album) {
      const isAlreadyInFavorites = await this.dbService.isAlbumInFavorites(id);

      if (!isAlreadyInFavorites) {
        this.dbService.addAlbumToFavorites(id);
        const album = await this.dbService.getAlbumById(id);
        console.log(album);
        return album;
      } else {
        throw new HttpException(
          'Album is already in favorites',
          HttpStatus.CREATED,
        );
      }
    } else {
      throw new HttpException("Album doesn't exist", HttpStatus.CREATED);
    }
  }

  removeAlbum(id: string) {
    this.dbService.deleteAlbumFromFavorites(id);
    return `Album with id ${id} was removed from favorites`;
  }

  async addArtist(id: string) {
    const artist = this.dbService.getArtistById(id);

    if (artist) {
      const isAlreadyInFavorites = await this.dbService.isArtistInFavorites(id);

      if (!isAlreadyInFavorites) {
        this.dbService.addArtistToFavorites(id);
        return this.dbService.getArtistById(id);
      } else {
        throw new HttpException(
          'Artist is already in favorites',
          HttpStatus.CREATED,
        );
      }
    } else {
      throw new HttpException("Artist doesn't exist", HttpStatus.CREATED);
    }
  }

  removeArtist(id: string) {
    this.dbService.deleteArtistFromFavorites(id);
    return `Artist with id ${id} was removed from favorites`;
  }
}
