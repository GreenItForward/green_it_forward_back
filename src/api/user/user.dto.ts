import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "@/common/enums/role.enum";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly lastName?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  public readonly email?: string;
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
  @IsNumber()
  @ApiProperty( { required: false })
  id: number;

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

  @IsDate()
  @IsOptional()
  @ApiProperty()
  lastLoginAt: Date | null;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  firstLoginAt: Date | null;

  @IsString()
  @IsOptional()
  @ApiProperty()
  imageUrl: string | null;
}