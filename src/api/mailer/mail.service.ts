import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    private configService: ConfigService;
    constructor(private mailerService: MailerService, configService: ConfigService) {
        this.configService = configService;
    }

    async sendMail(user: { name: string, email: string }) {
        await this.mailerService.sendMail({
            to: user.email,
            from: `No Reply - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
            subject: 'Greeting from GreenItForward',
            template: 'email',
            context: {
                name: user.name,
            }
        })
    }

    async sendUserConfirmation(user: { name: string, email: string}, token: string ) {
        token = Math.random().toString(36).slice(-8); // TODO: remove this and replace it by a common service func
        const url = `${this.configService.get<string>("FRONT_URL")}/auth/confirm?token=${token}`;
    
        await this.mailerService.sendMail({
          to: user.email,
          from: `Welcome Team - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
          subject: 'Welcome to GreenItForward ! Confirm your Email',
          template: './confirmation', 
          context: {
            name: user.name,
            url,
          },
        });
      }  

    async sendResetPasswordEmail(email:string, token: string ) {
        token = Math.random().toString(36).slice(-8); // TODO: remove this and replace it by a common service func
        const ourMailAdress = this.configService.get<string>("EMAIL_ADDRESS");
        const url = `${this.configService.get<string>("FRONT_URL")}/auth/reset-password?token=${token}`;
        await this.mailerService.sendMail({
          to: email,
          from: `Password Reset - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
          subject: 'Reset your password',
          template: './reset-password', 
          context: {
            ourMailAdress,
            url,
          },
        });
    }
}
 