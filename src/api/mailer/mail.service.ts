import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { SendResetPasswordDto } from './mail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
    private configService: ConfigService;
    constructor(private mailerService: MailerService, configService: ConfigService,
      @InjectRepository(User) private readonly userRepository: Repository<User>) {
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

    async sendUserConfirmation(user) {
        const token = `${user.id}-${Date.now()}`;
        const url = `${this.configService.get<string>("FRONT_URL")}/auth/confirm?token=${token}`;

        console.log(url)

        await this.userRepository.update(user.id, {confirmationToken: token});
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

    async sendResetPasswordEmail(user:SendResetPasswordDto, token: string, res:Response) {
        token = Math.random().toString(36).slice(-8); // TODO: remove this and replace it by a common service func
        const ourMailAdress = this.configService.get<string>("EMAIL_ADDRESS");
        const url = `${this.configService.get<string>("FRONT_URL")}/auth/reset-password?token=${token}`;
        await this.mailerService.sendMail({
        to: user.email,
        from: `Password Reset - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
        subject: 'Reset your password',
        template: './reset-password',
        context: {
          ourMailAdress,
          url,
        },
      });

      res.status(200).json({ message: 'Email sent' });

    }
}
 