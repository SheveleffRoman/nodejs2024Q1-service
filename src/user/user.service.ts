import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/database/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.dbService.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        favAlbum: [],
        favArtist: [],
        favTrack: [],
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        favAlbum: true,
        favArtist: true,
        favTrack: true,
      },
    });

    const createdAtTimestamp = new Date(newUser.createdAt).getTime();
    const updatedAtTimestamp = new Date(newUser.updatedAt).getTime();

    return {
      ...newUser,
      createdAt: createdAtTimestamp,
      updatedAt: updatedAtTimestamp,
    };
  }

  async findAll() {
    return this.dbService.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        favAlbum: true,
        favArtist: true,
        favTrack: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.dbService.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        favAlbum: true,
        favArtist: true,
        favTrack: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.dbService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (!updateUserDto) {
      throw new HttpException('Invalid dto format', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    } else {
      const updatedUser = await this.dbService.user.update({
        where: { id },
        data: {
          password: updateUserDto.newPassword,
          version: user.version + 1,
        },
        select: {
          id: true,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
          favAlbum: true,
          favArtist: true,
          favTrack: true,
        },
      });

      const createdAtTimestamp = new Date(updatedUser.createdAt).getTime();
      const updatedAtTimestamp = new Date(updatedUser.updatedAt).getTime();

      return {
        ...updatedUser,
        createdAt: createdAtTimestamp,
        updatedAt: updatedAtTimestamp,
      };
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }
    return this.dbService.user.delete({ where: { id: user.id } });
  }
}
