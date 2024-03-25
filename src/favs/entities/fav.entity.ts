import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorites {
  @ApiProperty()
  artists: string[];
  @ApiProperty()
  albums: string[];
  @ApiProperty()
  tracks: string[];
}

export class FavoritesList {
  @ApiProperty({ isArray: true })
  tracks: Track;
  @ApiProperty({ isArray: true })
  albums: Album;
  @ApiProperty({ isArray: true })
  artists: Artist;
}
