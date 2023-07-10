import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
import {Message} from "@/api/message/message.entity";

export class CreateResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly text: string;

  @IsNotEmpty()
  @ApiProperty()
  public readonly message: Promise<Message>;
}
