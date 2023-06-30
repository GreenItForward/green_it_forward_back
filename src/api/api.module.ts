import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { AuthModule } from "@/api/user/auth/auth.module";
import { StripeModule } from "@/api/stripe/stripe.module";
import { MailModule } from "@/api/mailer/mail.module";
import { InvoiceModule } from "@/api/invoice/invoice.module";
import { ProjectModule } from './project/project.module';
import { StatsModule } from "./admin/stats/stats.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    StripeModule,
    MailModule,
    InvoiceModule,
    ProjectModule,
    StatsModule
  ],
  controllers: []
})
export class ApiModule {} 