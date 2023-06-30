import { Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { StripeModule } from './api/stripe/stripe.module';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule } from '@nestjs/config';
import { InvoiceModule } from './api/invoice/invoice.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './api/mailer/mail.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ProjectModule } from './api/project/project.module';
import { StatsModule } from './api/admin/stats/stats.module';
import { ApiModule } from './api/api.module';

const envFilePath: string = getEnvPath(`${process.cwd()}`);

@Module({
  imports: [ 
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule
  ],
})
export class AppModule {}
