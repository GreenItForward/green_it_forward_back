import { Module } from '@nestjs/common';
import { UserController } from './api/user/user.controller';
import { UserModule } from './api/user/user.module';
import { StripeService } from './api/stripe/stripe.config';
import { StripeModule } from './api/stripe/stripe.module';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule } from '@nestjs/config';
import { InvoiceController } from './api/invoice/invoice.controller';
import { InvoiceService } from './api/invoice/invoice.service';
import { InvoiceModule } from './api/invoice/invoice.module';

const envFilePath: string = getEnvPath(`${process.cwd()}`);

@Module({
  imports: [ ConfigModule.forRoot({ envFilePath, isGlobal: true }), UserModule, StripeModule, InvoiceModule],
  controllers: [UserController, InvoiceController],
  providers: [StripeService, InvoiceService],
})
export class AppModule {}
