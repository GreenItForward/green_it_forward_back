import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class UploadDto {
  @IsNotEmpty()
  @ApiProperty()
  public readonly file: any;
}
