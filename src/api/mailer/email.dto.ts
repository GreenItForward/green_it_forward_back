import { Trim } from "class-sanitizer";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EmailDto {
    @Trim()
    @IsEmail()
    @ApiProperty()
    public readonly email: string;

    @IsString()
    @ApiProperty()
    public readonly name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly subject: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    public readonly message: string;
}