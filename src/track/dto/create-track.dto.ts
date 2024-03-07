import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID format for artistId' })
  artistId: string;

  @IsOptional()
  @IsUUID('4', { message: 'Invalid UUID format for albumId' })
  albumId: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
