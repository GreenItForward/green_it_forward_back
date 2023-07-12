import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  public readonly password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly lastName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly imageUrl?: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;
 
  @IsString()
  @ApiProperty()
  public readonly password: string;
}

export class ChangePasswordDto {
  @IsString()
  @ApiProperty()
  public readonly password: string;
}

export class UpdateImageDto {
  @IsString()
  @ApiProperty()
  public readonly imageUrl: string;
}