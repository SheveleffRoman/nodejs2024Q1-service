import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty({ required: false })
  @IsOptional()
  artistId?: string;
}
