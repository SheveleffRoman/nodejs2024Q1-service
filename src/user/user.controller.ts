import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'create user',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get all users',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get user by id',
    type: User,
  })
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return this.userService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'update user',
    type: User,
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'delete user',
    type: null,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return this.userService.remove(id);
  }
}
