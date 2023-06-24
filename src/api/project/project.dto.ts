import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @ApiProperty()
  readonly id: string;

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
  readonly amountRaised: number;

  @IsNumber()
  @ApiProperty()
  readonly totalAmount: number;

  @IsDate()
  @ApiProperty()
  readonly startDate: Date;

  @IsDate()
  @ApiProperty()
  readonly endDate: Date;

  @IsString()
  @ApiProperty()
  readonly createdBy: string;
}
