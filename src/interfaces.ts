import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Favorites } from './favs/entities/fav.entity';
import { Track } from './track/entities/track.entity';
import { User } from './user/entities/user.entity';

export interface IDatabase {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites;
}
