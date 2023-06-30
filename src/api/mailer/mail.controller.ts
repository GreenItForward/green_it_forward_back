import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Request,Response } from "express";
import { MailService } from "./mail.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { EmailDto } from "@/api/mailer/email.dto";

@ApiTags('Mailer')
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send/hi')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBody({ type: EmailDto })
    async sendHiEmail(@Body() body: EmailDto) {
        return await this.mailService.sendMail(body);
    } 
    
    @Post('send/reset-password')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBody({ type: EmailDto })
    async sendResetPasswordEmail(@Body() body: EmailDto, @Req() req: Request, res: Response) {
        return await this.mailService.sendResetPasswordEmail(body, req.headers.authorization, res);
    }

    @Post('send/confirmation')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBody({ type: EmailDto })
    async sendUserConfirmation(@Body() body: EmailDto, @Req() req: Request) {
        return await this.mailService.sendUserConfirmation(body, req.headers.authorization);
    }

}
