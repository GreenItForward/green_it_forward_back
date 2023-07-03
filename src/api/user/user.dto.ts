import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "@/common/enums/role.enum";

export class UpdateNameDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly firstName?: string;
}

export class ChangeRoleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  userId: number;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  @ApiProperty({ required: true })
  role: RoleEnum;
}

export class VerifyUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  token: string;
}

export class MeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  firstName: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastName: string | null;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  @ApiProperty({ required: true })
  role: RoleEnum;
}