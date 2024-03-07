import { Injectable } from '@nestjs/common';
import { IDatabase } from '../interfaces';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

/** random uuid v4 for fake data
644e05b5-5904-4345-b29a-052a1df44a82
56bb26d5-d2b0-4670-aa89-9dfe8411af2a
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
    artists: [],
    tracks: [
      {
        id: '3c7db318-d6de-4ab9-b6cb-66377fb88977',
        name: 'training season',
        artistId: '4ff1b43b-ba4b-4f36-90a9-ffcaa732a3b7',
        albumId: null,
        duration: 3,
      },
    ],
    albums: [],
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
}
