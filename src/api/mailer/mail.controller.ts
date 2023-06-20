import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Request } from "express";
import { MailService } from "./mail.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";

@ApiTags('Mailer')
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send/hi')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async sendHiEmail(@Body() body: { email: string, name: string }) {
        return await this.mailService.sendMail(body);
    } 
    
    @Post('send/reset-password')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async sendResetPasswordEmail(@Body() body: { email: string, name: string }, @Req() req: Request) {
        return await this.mailService.sendResetPasswordEmail(body, req.headers.authorization);
    }

    @Post('send/confirmation')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async sendUserConfirmation(@Body() body: { email: string, name: string }, @Req() req: Request) {
        return await this.mailService.sendUserConfirmation(body, req.headers.authorization);
    }
}   