import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendMail(email: string, name: string) {
        console.log(email, name);   
        await this.mailerService.sendMail({
            to: email,
            subject: 'Greeting from NestJS NodeMailer',
            template: './template/email.hbs',
            context: {
                name: name
            }
        })
    }
}
 