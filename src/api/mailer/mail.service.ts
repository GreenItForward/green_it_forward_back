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
            subject: 'Message de la part de GreenItForward',
            template: 'email', 
            context: {
                name: user.name,
            }
        })
    }

    async sendUserConfirmation(user) {
        const token = `${user.id}-${Date.now()}`;
        const url = `${this.configService.get<string>("FRONT_URL")}/auth/confirm?token=${token}`;
        const ourMailAdress = this.configService.get<string>("EMAIL_ADDRESS");

        await this.userRepository.update(user.id, { confirmationToken: token });
        await this.mailerService.sendMail({
          to: user.email,
          from: `Welcome Team - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
          subject: 'Bienvenue sur GreenItForward - Confirmez votre adresse email',
          template: './confirmation', 
          context: {
            logo : this.configService.get<string>("LOGO_URL"),
            name: user.name, 
            ourMailAdress,
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
        from: `Réinitialisation de mot de passe - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
        subject: 'Réinitialisation de mot de passe',
        template: './reset-password',
        context: {
          ourMailAdress,
          logo : this.configService.get<string>("LOGO_URL"),
          url,
        },
      });

      res.status(200).json({ message: 'Email sent' });
    }

    async sendPasswordChanged(user: User) {
      const ourMailAdress = this.configService.get<string>("EMAIL_ADDRESS");
      await this.mailerService.sendMail({
        to: user.email,
        from: `Mot de passe changé- GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
        subject: 'Votre mot de passe a été changé',
        template: './password-changed',
        context: {
          firstName: user.firstName,
          lastName: user.lastName,
          logo : this.configService.get<string>("LOGO_URL"),
          ourMailAdress,
        },
      });
    }

    async sendPaymentConfirmation(user: User, project: Project, amount: number) {
      const ourMailAdress = this.configService.get<string>("EMAIL_ADDRESS");
      await this.mailerService.sendMail({
        to: user.email,
        from: `Confirmation de paiement - GreenItForward <${this.configService.get<string>("EMAIL_FROM")}>`,
        subject: 'Votre paiement a été effectué',
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
 