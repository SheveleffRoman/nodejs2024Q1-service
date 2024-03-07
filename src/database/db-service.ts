import { Injectable } from '@nestjs/common';
import { IDatabase } from '../interfaces';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Fav } from 'src/favs/entities/fav.entity';

/** random uuid v4 for fake data

487b0e19-c9a9-4259-9a64-980fec56ef68
8fcc09e8-5df5-40bc-9497-9299952a3da8
89e44784-deff-4492-a3c7-f7a433089a01
cd9c0955-5f7d-436d-a1e1-8bebcfa3d563
7fead713-8987-4d01-af3a-1bdded488e0c
6b088756-be07-4081-b0fe-af20f8f41c6d
78c0f78c-877f-4408-aae8-5f237c5c7515
32d589d4-43a2-44a0-9ba1-6a0af84a5c35
ef45e77c-93d8-49b8-a172-67f6bbf7a167
abc508ff-61db-4224-8e7f-111dcd6b78de
9ba6bf7a-82c5-42d8-bace-fd9ffefe02ff
be93a35a-fad9-4b7b-b738-e6b9cf18c38f
080056cb-e103-42f9-b298-6effabf0546b
 */

@Injectable()
export class DbService {
  private db: IDatabase = {
    users: [
      {
        id: '30c428fc-1c31-4bdd-b454-a81fd53efa0f',
        login: 'Random',
        password: 'StrongPassword',
        version: 1,
        createdAt: 435454,
        updatedAt: 345435,
      },
    ],
    artists: [
      {
        id: '644e05b5-5904-4345-b29a-052a1df44a82',
        name: 'Dua Lipa',
        grammy: true,
      },
    ],
    tracks: [
      {
        id: '3c7db318-d6de-4ab9-b6cb-66377fb88977',
        name: 'training season',
        artistId: '644e05b5-5904-4345-b29a-052a1df44a82',
        albumId: '56bb26d5-d2b0-4670-aa89-9dfe8411af2a',
        duration: 3,
      },
    ],
    albums: [
      {
        id: '56bb26d5-d2b0-4670-aa89-9dfe8411af2a',
        name: 'One',
        year: 2024,
        artistId: '644e05b5-5904-4345-b29a-052a1df44a82',
      },
    ],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };

  //user

  getAllUsers(): User[] {
    return this.db.users;
  }

  getUserById(id: string): User {
    return this.db.users.find((user) => user.id === id);
  }

  addUser(dto: User) {
    this.db.users.push(dto);
    return dto;
  }

  updateUser(dto: User): void {
    this.db.users = this.db.users.map((user) =>
      user.id === dto.id ? { ...user, ...dto } : user,
    );
  }

  deleteUser(id: string) {
    return (this.db.users = this.db.users.filter((user) => user.id !== id));
  }

  //track

  getAllTracks(): Track[] {
    return this.db.tracks;
  }

  getTrackById(id: string): Track {
    return this.db.tracks.find((track) => track.id === id);
  }

  addTrack(dto: Track) {
    this.db.tracks.push(dto);
    return dto;
  }

  updateTrack(dto: Partial<Track>): void {
    this.db.tracks = this.db.tracks.map((track) =>
      track.id === dto.id ? { ...track, ...dto } : track,
    );
  }

  deleteTrack(id: string) {
    return (this.db.tracks = this.db.tracks.filter((track) => track.id !== id));
  }

  //artist

  getAllArtists(): Artist[] {
    return this.db.artists;
  }

  getArtistById(id: string): Artist {
    return this.db.artists.find((artist) => artist.id === id);
  }

  addArtist(dto: Artist) {
    this.db.artists.push(dto);
    return dto;
  }

  updateArtist(dto: Partial<Artist>): void {
    this.db.artists = this.db.artists.map((artist) =>
      artist.id === dto.id ? { ...artist, ...dto } : artist,
    );
  }

  deleteArtist(id: string) {
    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
  }

  //album

  getAllAlbums() {
    return this.db.albums;
  }

  getAlbumById(id: string): Album {
    return this.db.albums.find((album) => album.id === id);
  }

  addAlbum(dto: Album) {
    this.db.albums.push(dto);
    return dto;
  }

  updateAlbum(dto: Partial<Album>) {
    this.db.albums = this.db.albums.map((album) =>
      album.id === dto.id ? { ...album, ...dto } : album,
    );
  }

  deleteAlbum(id: string) {
    return (this.db.albums = this.db.albums.filter((album) => album.id !== id));
  }

  // Favorites
  getAllFavorites(): Fav {
    return this.db.favorites;
  }

  addTrackToFavorites(id: string) {
    return this.db.favorites.tracks.push(id);
  }

  isTrackInFavorites(trackId: string): boolean {
    return this.db.favorites.tracks.includes(trackId);
  }

  deleteTrackFromFavorites(id: string) {
    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  addAlbumToFavorites(id: string) {
    return this.db.favorites.albums.push(id);
  }

  isAlbumInFavorites(albumId: string): boolean {
    return this.db.favorites.albums.includes(albumId);
  }

  deleteAlbumFromFavorites(id: string) {
    return (this.db.favorites.albums = this.db.favorites.albums.filter(
      (albumId) => albumId !== id,
    ));

    // console.log(this.db.favorites);
    // this.db.favorites.albums.push("roman")

    // console.log(this.db.favorites);
  }

  addArtistToFavorites(id: string) {
    return this.db.favorites.artists.push(id);
  }

  isArtistInFavorites(artistId: string): boolean {
    return this.db.favorites.artists.includes(artistId);
  }

  deleteArtistFromFavorites(id: string) {
    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
