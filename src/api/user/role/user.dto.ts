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