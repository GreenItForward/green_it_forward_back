import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Address, PaymentIntent, PaymentMethod } from '@stripe/stripe-js';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  
  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  getStripeInstance(): Stripe {
    return this.stripe;
  }


  async getPaymentMethod(id: string): Promise<{ last4: string, name: string, address: Address, brand: string } | null> {
    const paymentMethod = await this.stripe.paymentMethods.retrieve(id);
    const last4 = paymentMethod.card ? paymentMethod.card.last4 : '';
    const name = paymentMethod.billing_details.name;
    const address = paymentMethod.billing_details.address;
    const brand = paymentMethod.card ? paymentMethod.card.brand : '';
  
    return { last4, name, address, brand };
  }

  async getPaymentIntent(id: string): Promise<{amount: number, currency: string, status: string}> {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(id);
    const amount = paymentIntent.amount;
    const currency = paymentIntent.currency;
    const status = paymentIntent.status;
    
    return { amount, currency, status };
  }
  
}
 