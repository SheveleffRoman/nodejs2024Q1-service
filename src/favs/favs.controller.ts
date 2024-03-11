import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { FavoritesList } from './entities/fav.entity';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get all favorites list',
    type: FavoritesList,
  })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'add track to favorites',
    type: Track,
  })
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'delete track from favorites',
    type: null,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeTrack(id);
  }

  @Post('/album/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'add album to favorites',
    type: Album,
  })
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'delete album from favorites',
    type: null,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('/artist/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'add artist to favorites',
    type: Artist,
  })
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'delete artist from favorites',
    type: null,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeArtist(id);
  }
}
