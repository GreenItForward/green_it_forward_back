import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.config';
import { Stripe } from './stripe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stripe])],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}