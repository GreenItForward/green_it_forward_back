import { IsDateString } from '@/common/decorators/is-date-string/is-date-string.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsUUID } from 'class-validator';

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
  readonly amountRaised: number;

  @IsNumber()
  @ApiProperty()
  readonly totalAmount: number;

  @IsDateString()
  @ApiProperty()
  readonly startDate: string;

  @IsDateString()
  @ApiProperty()
  readonly endDate: string;

  @IsString()
  @ApiProperty()
  readonly createdBy: string;
}

export class GetProjectById {
    @IsString()
    @ApiProperty()
    @IsUUID()
    readonly id: string;
    }
