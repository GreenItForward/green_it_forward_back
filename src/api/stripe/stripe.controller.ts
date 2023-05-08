import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.config';

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

}
