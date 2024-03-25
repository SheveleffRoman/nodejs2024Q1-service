import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'create track',
    type: Track,
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get all tracks',
    type: [Track],
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get track by id',
    type: Track,
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
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'update track',
    type: Track,
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'delete track',
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
    return this.trackService.remove(id);
  }
}
