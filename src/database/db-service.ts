import { Injectable } from '@nestjs/common';
import { IDatabase } from '../interfaces';
import { User } from 'src/user/entities/user.entity';

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
    tracks: [],
    albums: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };

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
}
