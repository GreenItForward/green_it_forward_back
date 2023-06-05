import { Controller, Param, Post, Query, Req } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('send/:email/:name')
    async sendEmail(@Param('email') email:string, @Param('name') name:string) {
        return await this.mailService.sendMail(email, name);
    }  
} 