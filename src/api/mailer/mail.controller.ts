import { Body, Controller, Param, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send/hi')
    async sendHiEmail(@Body() body: { email: string, name: string }) {
        return await this.mailService.sendMail(body);
    } 
    
    @Post('send/reset-password')
    async sendResetPasswordEmail(@Body() body: { email: string, name: string }, @Req() req: Request) {
        return await this.mailService.sendResetPasswordEmail(body, req.headers.authorization);
    }

    @Post('send/confirmation')
    async sendUserConfirmation(@Body() body: { email: string, name: string }, @Req() req: Request) {
        return await this.mailService.sendUserConfirmation(body, req.headers.authorization);
    }

}   