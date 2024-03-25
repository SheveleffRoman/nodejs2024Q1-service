import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DbService } from 'src/database/db.service';

@Injectable()
export class FavsService {
  constructor(private dbService: DbService) {}

  // immitation, remove later
  async createFakeUser() {
    const user = await this.dbService.user.findFirst();

    if (user) {
      return user;
    }

    return this.dbService.user.create({
      data: {
        login: 'fakeUser',
        password: 'veryStrongPassword',
        version: 1,
        favAlbum: [],
        favArtist: [],
        favTrack: [],
      },
    });
  }

  async findAll() {
    const user = await this.createFakeUser();

    const tracks = await this.dbService.track.findMany({
      where: { id: { in: user.favTrack } },
    });

    const albums = await this.dbService.album.findMany({
      where: { id: { in: user.favAlbum } },
    });

    const artists = await this.dbService.artist.findMany({
      where: { id: { in: user.favArtist } },
    });

    return { tracks, albums, artists };
  }

  async addTrack(id: string) {
    const user = await this.createFakeUser();

    const track = await this.dbService.track.findUnique({
      where: { id: id },
    });

    if (!track) {
      throw new UnprocessableEntityException();
    }

    await this.dbService.user.update({
      where: { id: user.id },
      data: { favTrack: { push: track.id } },
      select: {
        favTrack: true,
      },
    });

    return track;
  }

  async removeTrack(id: string) {
    const user = await this.createFakeUser();
    const favTrack = user.favTrack.filter((track) => track !== id);
    return this.dbService.user.update({
      where: { id: user.id },
      data: { ...user, favTrack },
    });
  }

  async addAlbum(id: string) {
    const user = await this.createFakeUser();

    const album = await this.dbService.album.findUnique({
      where: { id: id },
    });

    if (!album) {
      throw new UnprocessableEntityException();
    }

    await this.dbService.user.update({
      where: { id: user.id },
      data: { favAlbum: { push: album.id } },
      select: {
        favAlbum: true,
      },
    });

    return album;
  }

  async removeAlbum(id: string) {
    const user = await this.createFakeUser();
    const favAlbum = user.favAlbum.filter((album) => album !== id);
    return this.dbService.user.update({
      where: { id: user.id },
      data: { ...user, favAlbum },
    });
  }

  async addArtist(id: string) {
    const user = await this.createFakeUser();

    const artist = await this.dbService.artist.findUnique({
      where: { id: id },
    });

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    await this.dbService.user.update({
      where: { id: user.id },
      data: { favArtist: { push: artist.id } },
      select: {
        favArtist: true,
      },
    });

    return artist;
  }

  async removeArtist(id: string) {
    const user = await this.createFakeUser();
    const favArtist = user.favArtist.filter((artist) => artist !== id);
    return this.dbService.user.update({
      where: { id: user.id },
      data: { ...user, favArtist },
    });
  }
}
