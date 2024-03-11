import { Injectable } from '@nestjs/common';
import { IDatabase } from '../interfaces';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class DbService {
  private db: IDatabase = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };

  async getAllUsers() {
    return this.db.users;
  }

  async getUserById(id: string) {
    return this.db.users.find((user) => user.id === id);
  }

  async addUser(dto: User) {
    this.db.users.push(dto);
    return dto;
  }

  async updateUser(dto: User) {
    this.db.users = this.db.users.map((user) =>
      user.id === dto.id ? { ...user, ...dto } : user,
    );
  }

  async deleteUser(id: string) {
    return (this.db.users = this.db.users.filter((user) => user.id !== id));
  }

  async getAllTracks() {
    return this.db.tracks;
  }

  async getTrackById(id: string) {
    return this.db.tracks.find((track) => track.id === id);
  }

  async addTrack(dto: Track) {
    this.db.tracks.push(dto);
    return dto;
  }

  async updateTrack(dto: Partial<Track>) {
    this.db.tracks.map((track) =>
      track.id === dto.id ? { ...track, ...dto } : track,
    );
    return dto;
  }

  async deleteTrack(id: string) {
    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
    return id;
  }

  async getAllArtists() {
    return this.db.artists;
  }

  async getArtistById(id: string) {
    return this.db.artists.find((artist) => artist.id === id);
  }

  async addArtist(dto: Artist) {
    this.db.artists.push(dto);
    return dto;
  }

  async updateArtist(dto: Partial<Artist>) {
    this.db.artists = this.db.artists.map((artist) =>
      artist.id === dto.id ? { ...artist, ...dto } : artist,
    );
    return dto;
  }

  async deleteArtist(id: string) {
    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
    return id;
  }

  async getAllAlbums() {
    return this.db.albums;
  }

  async getAlbumById(id: string) {
    return this.db.albums.find((album) => album.id === id);
  }

  async addAlbum(dto: Album) {
    this.db.albums.push(dto);
    return dto;
  }

  async updateAlbum(dto: Partial<Album>) {
    this.db.albums = this.db.albums.map((album) =>
      album.id === dto.id ? { ...album, ...dto } : album,
    );
    return dto;
  }

  async deleteAlbum(id: string) {
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
    return id;
  }

  async getAllFavorites() {
    return this.db.favorites;
  }

  async addTrackToFavorites(id: string) {
    this.db.favorites.tracks.push(id);
  }

  async deleteTrackFromFavorites(id: string) {
    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  async addAlbumToFavorites(id: string) {
    this.db.favorites.albums.push(id);
  }

  async deleteAlbumFromFavorites(id: string) {
    this.db.favorites.albums = this.db.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  async addArtistToFavorites(id: string) {
    this.db.favorites.artists.push(id);
  }

  async deleteArtistFromFavorites(id: string) {
    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
