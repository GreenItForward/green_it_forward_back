import { UserModule } from './../user/user.module';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { CreatePaymentDto, PaymentIntentDto, PaymentMethodDto } from "@/api/stripe/stripe.dto";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Payment } from './stripe.entity';
import { Project } from '../project/project.entity';
import { MailService } from '../mailer/mail.service';

@Injectable()
export class StripeService {
  @InjectRepository(Payment)
  private readonly paymentReposiory: Repository<Payment>;
  @InjectRepository(Project)
  private readonly projectReposiory: Repository<Project>;

  private stripe: Stripe;
  
  constructor(private readonly configService: ConfigService, protected mailService: MailService) {
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
    const date = new Date(paymentIntent.created * 1000).toISOString();
    
    return {userId, projectId, amount, currency, status, date};
  }

  async getPaymentsByUser(id: number) : Promise<Payment[]> {
    const payments = await this.paymentReposiory.createQueryBuilder('payment')
      .where('payment.userId = :id', { id: id })
      .getMany();

    return payments;
}

async getPaymentsIntentByUser(id: number) : Promise<PaymentIntentDto[]> {
  const payments = await this.getPaymentsByUser(id);
  const paymentIntentsPromises = payments.map(payment => this.getPaymentIntent(payment.paymentIntentId));
  const paymentIntents = await Promise.all(paymentIntentsPromises);

  return paymentIntents;
}

  async createPaymentIntent(body: CreatePaymentDto, user: User) {
    const stripe = this.getStripeInstance();
    const convertedAmount = Math.round(body.amount * 100);
    const project = await this.projectReposiory.findOneBy({ id: body.projectId });
    const now = new Date();
    const startDate = new Date(project.startDate);

    if (startDate < now) {
      project.startDate = now;
    }

    const endDate = new Date(project.endDate);
    
    if (endDate < now) {
      throw new HttpException('Project is already finished', HttpStatus.BAD_REQUEST);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertedAmount,
      currency: 'eur',
      metadata: { userId: user.id, projectId: body.projectId },
    });

    await this.paymentReposiory.save({
      paymentIntentId: paymentIntent.id,
      user: user,
      date: new Date(),
      metadata: { userId: user.id, projectId: body.projectId },
    });

    project.amountRaised =  Number(project.amountRaised) + Number(body.amount);

    await this.projectReposiory.save(project);

    this.mailService.sendPaymentConfirmation(user, project, body.amount);

    return { clientSecret: paymentIntent.client_secret };
  
  }
  
}