import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { DbService } from 'src/database/db-service';
import { User, UserArrayResponseDto } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  create(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newUser = this.dbService.addUser(user);
    return new User(newUser);
  }

  findAll() {
    const users = this.dbService.getAllUsers();
    const usersWithoutPassword = users.map((user) => new User(user));
    return Array(new UserArrayResponseDto(usersWithoutPassword));
  }

  async findOne(id: string) {
    const user = this.dbService.getUserById(id);
    if (!user)
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    return new User(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if(!updateUserDto) {
      throw new HttpException('Invalid dto format', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    } else {
      const updatedUser: User = {
        ...user,
        password: updateUserDto.newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      };

      this.dbService.updateUser(updatedUser);

      return new User(updatedUser);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user)
    throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    this.dbService.deleteUser(user.id);
    return user;
  }
}
