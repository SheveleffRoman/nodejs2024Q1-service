import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID format for artistId' })
  artistId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID format for albumId' })
  albumId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
