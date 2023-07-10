import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
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
