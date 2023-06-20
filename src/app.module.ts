import { Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { StripeModule } from './api/stripe/stripe.module';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule } from '@nestjs/config';
import { InvoiceModule } from './api/invoice/invoice.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './api/mailer/mail.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmService } from './shared/typeorm/typeorm.service';

const envFilePath: string = getEnvPath(`${process.cwd()}`);

@Module({
  imports: [ 
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    UserModule, StripeModule, InvoiceModule, MailModule, MailerModule
  ],
})
export class AppModule {}
