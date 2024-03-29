import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Request,Response } from "express";
import { MailService } from "./mail.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { EmailDto } from "@/api/mailer/email.dto";
import { User } from "../user/user.entity";
import { SendResetPasswordDto } from "./mail.dto";
import { Roles } from "../user/role/role.decorator";
import { RoleEnum } from "@/common/enums/role.enum";

@ApiTags('Mailer')
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send/mail')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Roles(RoleEnum.ADMINISTRATEUR)
    @ApiBody({ type: EmailDto })
    async sendEmail(@Body() body: EmailDto) {
        return await this.mailService.sendMail(body);
    } 
    
    @Post('send/reset-password')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBody({ type: EmailDto })
    async sendResetPasswordEmail(@Body() body: SendResetPasswordDto, @Req() req: Request, res: Response) {
        return await this.mailService.sendResetPasswordEmail(body, res);
    }

    @Post('send/confirmation')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBody({ type: EmailDto })
    async sendUserConfirmation(@Body() body: EmailDto, @Req() req: Request) {
        return await this.mailService.sendUserConfirmation(<User>req.user);
    }

}
