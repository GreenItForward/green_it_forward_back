import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(1)
  @MaxLength(50)
  public readonly name: string;

  @IsString()
  @ApiProperty()
  @MaxLength(300)
  public readonly description: string;

  @IsString()
  @ApiProperty()
  public readonly imgUrl: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty()
  public readonly followers: number[];
}

export class UpdateCommunityDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  @MinLength(1)
  @MaxLength(50)
  public readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @MaxLength(300)
  public readonly description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly imgUrl: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty()
  public readonly followers: number[];
}
