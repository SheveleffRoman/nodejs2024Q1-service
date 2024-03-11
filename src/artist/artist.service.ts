import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/database/db.service';
import { Artist } from './entities/artist.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuid(),
      ...createArtistDto,
    };
    return this.dbService.addArtist(newArtist);
  }

  findAll() {
    return this.dbService.getAllArtists();
  }

  async findOne(id: string) {
    const artist = await this.dbService.getArtistById(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    this.dbService.updateArtist(updatedArtist);

    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    this.dbService.deleteArtist(id);

    const tracks = await this.dbService.getAllTracks();
    const correspondingTracks = tracks.filter((track) => track.artistId === id);
    correspondingTracks.map((track) =>
      this.dbService.updateTrack({ ...track, artistId: null }),
    );

    const albums = await this.dbService.getAllAlbums();
    const correspondingAlbums = albums.filter((album) => album.artistId === id);
    correspondingAlbums.map((album) =>
      this.dbService.updateAlbum({ ...album, artistId: null }),
    );

    this.dbService.deleteArtistFromFavorites(id);

    return artist;
  }
}
