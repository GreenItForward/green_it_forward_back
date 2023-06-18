import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly nom: string;

  @IsString()
  @ApiProperty()
  public readonly description: string;
}
