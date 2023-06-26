import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateNameDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly firstName?: string;
}