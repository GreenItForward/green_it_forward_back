import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { AuthModule } from "@/api/user/auth/auth.module";
import { StripeModule } from "@/api/stripe/stripe.module";
import { MailModule } from "@/api/mailer/mail.module";
import { InvoiceModule } from "@/api/invoice/invoice.module";
import { ProjectController } from './project/project.controller';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    StripeModule,
    MailModule,
    InvoiceModule,
    ProjectModule
  ],
  controllers: [ProjectController]
})
export class ApiModule {}