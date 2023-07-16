import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import {Message} from "@/api/message/message.entity";

export class CreateResponseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(300)
  @ApiProperty()
  public readonly text: string;

  @IsNotEmpty()
  @ApiProperty()
  public readonly message: Promise<Message>;
}
