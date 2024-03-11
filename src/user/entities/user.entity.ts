import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  version: number;
  @ApiProperty()
  createdAt: number;
  @ApiProperty()
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
