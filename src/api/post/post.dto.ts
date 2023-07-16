import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import {Community} from "@/api/community/community.entity";
import {Message} from "@/api/message/message.entity";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  @ApiProperty()
  public readonly subject: string;

  @IsString()
  @MinLength(1)
  @MaxLength(300)
  @ApiProperty()
  public readonly text: string;

  @IsNotEmpty()
  @ApiProperty()
  public readonly community: Promise<Community>;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty()
  public readonly messages: Message[];
}
