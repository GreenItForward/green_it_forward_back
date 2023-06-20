import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Request } from "express";
import { MailService } from "./mail.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { EmailDto } from "@/api/mailer/email.dto";

@ApiTags('Mailer')
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send/hi')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBody({ type: EmailDto })
    async sendHiEmail(@Body() body: EmailDto) {
        return await this.mailService.sendMail(body);
    } 
    
    @Post('send/reset-password')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBody({ type: EmailDto })
    async sendResetPasswordEmail(@Body() body: EmailDto, @Req() req: Request) {
        return await this.mailService.sendResetPasswordEmail(body, req.headers.authorization);
    }

    @Post('send/confirmation')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBody({ type: EmailDto })
    async sendUserConfirmation(@Body() body: EmailDto, @Req() req: Request) {
        return await this.mailService.sendUserConfirmation(body, req.headers.authorization);
    }
}