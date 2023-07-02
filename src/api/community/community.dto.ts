import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  public readonly description: string;

  @IsString()
  @ApiProperty()
  public readonly imgUrl: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty()
  public readonly followers: number[];
}
