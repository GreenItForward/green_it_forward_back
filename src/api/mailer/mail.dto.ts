import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendHiDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    name: string;
}

export class SendConfirmationDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    name: string;
}

export class SendResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}