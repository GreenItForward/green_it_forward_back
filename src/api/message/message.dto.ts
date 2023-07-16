import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import {Post} from "@/api/post/post.entity";

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly text: string;

  @IsNotEmpty()
  @ApiProperty()
  public readonly post: Promise<Post>;
}
