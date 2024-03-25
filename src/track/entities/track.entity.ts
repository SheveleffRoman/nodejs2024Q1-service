import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true })
  artistId?: string | null;
  @ApiProperty({ nullable: true })
  albumId?: string | null;
  @ApiProperty()
  duration: number;
}
