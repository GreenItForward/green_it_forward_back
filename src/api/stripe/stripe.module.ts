import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.config';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
