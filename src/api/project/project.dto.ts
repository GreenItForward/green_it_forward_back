import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @ApiProperty()
  readonly imageUrl: string;

  @IsNumber()
  @ApiProperty()
  readonly totalAmount: number;

  @IsDateString()
  @ApiProperty()
  readonly endDate: string;
}

export class GetProjectById {
    @IsString()
    @ApiProperty()
    @IsUUID()
    readonly id: string;
}


export class EditProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly totalAmount: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  readonly endDate: string;
}