import { Module } from '@nestjs/common';
import { UserController } from './api/user/user.controller';
import { UserModule } from './api/user/user.module';
import { StripeService } from './api/stripe/stripe.config';
import { StripeModule } from './api/stripe/stripe.module';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InvoiceController } from './api/invoice/invoice.controller';
import { InvoiceService } from './api/invoice/invoice.service';
import { InvoiceModule } from './api/invoice/invoice.module';
import { MailController } from './api/mailer/mail.controller';
import { MailService } from './api/mailer/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

const envFilePath: string = getEnvPath(`${process.cwd()}`);

@Module({
  imports: [ 
    ConfigModule.forRoot({ envFilePath, isGlobal: true }), 
    UserModule, StripeModule, InvoiceModule, 
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('EMAIL_ADDRESS'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('EMAIL_ADDRESS')}>`,
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          }
        }
      }),
      inject: [ConfigService],
    }), ConfigModule.forRoot()],
  controllers: [UserController, InvoiceController, MailController],
  providers: [StripeService, InvoiceService, MailService],
})
export class AppModule {}
