import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { MailService } from "./mail.service";
import { Request, Response } from 'express';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send/hi')
    async sendHiEmail(@Body() body: { email: string, name: string }) {
        return await this.mailService.sendMail(body);
    } 
    
    @Get('send/reset-password/:email')
    async sendResetPasswordEmail(@Param('email') email:string, @Req() req: Request, @Res() res: Response) {
        return await this.mailService.sendResetPasswordEmail(email, req.headers.authorization, res);
        
    }

    @Post('send/confirmation')
    async sendUserConfirmation(@Body() body: { email: string,  name: string }, @Req() req: Request) {
        return await this.mailService.sendUserConfirmation(body, req.headers.authorization);
    }  

}   