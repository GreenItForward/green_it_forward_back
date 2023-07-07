import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { PaymentIntentDto, PaymentMethodDto } from "@/api/stripe/stripe.dto";

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

  async getPaymentMethod(id: string): Promise<PaymentMethodDto | null> {
    const paymentMethod = await this.stripe.paymentMethods.retrieve(id);
    const last4 = paymentMethod.card ? paymentMethod.card.last4 : '';
    const name = paymentMethod.billing_details.name;
    const address = paymentMethod.billing_details.address;
    const brand = paymentMethod.card ? paymentMethod.card.brand : '';
  
    return { last4, name, address, brand };
  }

  async getPaymentIntent(id: string): Promise<PaymentIntentDto> {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(id);
    const amount = paymentIntent.amount;
    const currency = paymentIntent.currency;
    const status = paymentIntent.status;
    const userId = parseInt(paymentIntent.metadata.userId);
    const projectId = paymentIntent.metadata.projectId;
    
    return {userId, projectId, amount, currency, status };
  }
 

}