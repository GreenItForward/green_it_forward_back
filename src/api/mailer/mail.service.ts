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
        const url = `example.com/auth/confirm?token=${token}`;
    
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

    async sendResetPasswordEmail(user: { name: string, email: string}, token: string ) {
        const url = `example.com/auth/reset-password?token=${token}`;
        await this.mailerService.sendMail({
          to: user.email,
          from: `Password Reset - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
          subject: 'Reset your password',
          template: './reset-password', 
          context: {
            name: user.name,
            url,
          },
        });
      }
}
 