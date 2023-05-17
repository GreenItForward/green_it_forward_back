import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { StripeService } from './stripe.config';
import { Address, PaymentMethod } from '@stripe/stripe-js';

@Controller('payments')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount : number}) {
    const stripe = this.stripeService.getStripeInstance();
    const { amount } = body;
    const convertedAmount = Math.round(amount * 100); 

    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertedAmount,
      currency: 'eur',
    });
    return { clientSecret: paymentIntent.client_secret };
  }

  @Get('payment-method/:id')
  async getPaymentMethod(@Param('id') id: string): Promise<{ last4: string, name: string, address: Address, brand: string } | null> {
    return await this.stripeService.getPaymentMethod(id);
  }

  @Get('payment-intent/:id')
  async getPaymentIntent(@Param('id') id: string): Promise<{amount: number, currency: string, status: string}> {
    return await this.stripeService.getPaymentIntent(id);
  }

}
