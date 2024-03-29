import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsDateString, IsOptional, IsNotEmpty, Max, MaxLength } from 'class-validator';
import { MeDto } from '../user/user.dto';

export class CreateProjectDto {
  @IsString()
  @MaxLength(60)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MaxLength(200)
  @ApiProperty()
  readonly description: string;

  @IsString()
  @ApiProperty()
  readonly imageUrl: string;

  @IsNumber()
  @Max(1000000000)
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
  @MaxLength(60)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly imageUrl: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(1000000000)
  @ApiProperty()
  readonly totalAmount: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  readonly endDate: string;
}

export class ProjectDto {
@IsUUID()
@ApiProperty()
readonly id: string;

@IsString()
@MaxLength(60)
@ApiProperty()
readonly name: string;

@IsString()
@MaxLength(200)
@ApiProperty()
readonly description: string;

@IsString()
@ApiProperty()
readonly imageUrl: string;

@IsNumber()
@Max(1000000000)
@ApiProperty()
readonly amountRaised: number;

@IsNumber()
@Max(1000000000)
@ApiProperty()
readonly totalAmount: number;

@IsDateString()
@ApiProperty()
readonly startDate: string;

@IsDateString()
@ApiProperty()
readonly endDate: string;

@ApiProperty({ type: () => MeDto })
readonly createdBy: MeDto;
}
