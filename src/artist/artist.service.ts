import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from 'src/database/db-service';
import { Artist } from './entities/artist.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  private readonly logger = new Logger(ArtistService.name);

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: uuid(),
      ...createArtistDto,
    };
    return this.dbService.addArtist(artist);
  }

  findAll() {
    return this.dbService.getAllArtists();
  }

  async findOne(id: string) {
    const artist = this.dbService.getArtistById(id);
    if (!artist)
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    if (!artist)
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);

    if (!updateArtistDto) {
      throw new HttpException('Invalid dto format', HttpStatus.BAD_REQUEST);
    }

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };
    this.dbService.updateArtist(updatedArtist);
    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    if (!artist)
      throw new HttpException("Artist doesn't exist", HttpStatus.NOT_FOUND);
    this.dbService.deleteArtist(id);

    // change artist id to null in all tracks
    const tracks = this.dbService.getAllTracks();
    const filteredTracks = tracks.filter((track) => track.artistId === id);
    filteredTracks.forEach((track) => {
      this.dbService.updateTrack({ ...track, artistId: null });
    });

    this.dbService.deleteArtistFromFavorites(id);

    return artist;

    // // change artist id to null in all tracks
    // const tracks = this.dbService.getAllTracks();
    // this.logger.log(tracks[0]);
    // const filteredTracks = tracks.filter((track) => track.artistId === id);
    // this.logger.log(filteredTracks[0]);
    // filteredTracks.forEach(async (track) => {
    //   const updatedtrack = {
    //     ...track,
    //     artistId: null,
    //   };
    //   this.dbService.updateTrack(updatedtrack);
    //   this.logger.log(updatedtrack);
    // });
  }
}
// const tracks = this.dbService.getAllTracks();
// const filteredTracks = tracks.filter((track) => track.artistId === id);
// filteredTracks.forEach((track) => {
//   this.dbService.updateTrack({ ...track, artistId: null });
// });

// change album id to null in all tracks
// const albums = await this.dbService.getAllAlbums();
// const filteredAlbums = albums.filter((album) => album.artistId === id);
// filteredAlbums.forEach((album) => {
//   this.dbService.updateAlbum({ ...album, artistId: null });
// });

// this.dbService.deleteArtistFromFavorites(id);
