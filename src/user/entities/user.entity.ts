import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export class UserArrayResponseDto {
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }
}
