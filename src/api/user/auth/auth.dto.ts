import { TokenResponse } from '@/common/types/token-response.interface';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
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
  @MaxLength(30)
  @ApiProperty()
  public readonly firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
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
  @MinLength(8)
  @ApiProperty()
  public readonly password: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @ApiProperty()
  public readonly password: string;
}

export class ForgotChangePasswordDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  public readonly password: string;

  @IsString()
  @ApiProperty()
  public readonly token: string;
}

export class ForgotPasswordDto {
  @Trim()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;
}

export class UpdateImageDto {
  @IsString()
  @ApiProperty()
  public readonly imageUrl: string;
}

export class TokenResponseDto implements TokenResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly token: string;
}