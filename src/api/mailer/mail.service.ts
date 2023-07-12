import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { SendResetPasswordDto } from './mail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Project } from '../project/project.entity';

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
  
        await this.userRepository.update(user.id, { confirmationToken: token });
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

    async sendPasswordChanged(user: User) {
      const ourMailAdress = this.configService.get<string>("EMAIL_ADDRESS");
      await this.mailerService.sendMail({
        to: user.email,
        from: `Password Changed - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
        subject: 'Your password has been changed',
        template: './password-changed',
        context: {
          firstName: user.firstName,
          lastName: user.lastName,
          ourMailAdress,
        },
      });
    }

    async sendPaymentConfirmation(user: User, project: Project, amount: number) {
      const ourMailAdress = this.configService.get<string>("EMAIL_ADDRESS");
      await this.mailerService.sendMail({
        to: user.email,
        from: `Payment Confirmation - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
        subject: 'Your payment has been confirmed',
        template: './payment-confirmation',
        context: {
          logo: this.configService.get<string>("LOGO_URL"),
          name: user.firstName + ' ' + user.lastName,
          ourMailAdress,
          projectName: project.name,
          amount,
        },
      });
    }
} 
 