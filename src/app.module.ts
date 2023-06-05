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
import { MailModule } from './api/mailer/mail.module';

const envFilePath: string = getEnvPath(`${process.cwd()}`);

@Module({
  imports: [ 
    ConfigModule.forRoot({ envFilePath, isGlobal: true }), 
    UserModule, StripeModule, InvoiceModule, MailModule, AppModule,
    MailerModule
  ],
  controllers: [UserController, InvoiceController, MailController],
  providers: [StripeService, InvoiceService, MailService],
})
export class AppModule {}
