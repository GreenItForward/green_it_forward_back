import { UserModule } from './../user/user.module';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { CreatePaymentDto, PaymentIntentDto, PaymentMethodDto, PaymentMethodTotalDto } from "@/api/stripe/stripe.dto";
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
 
  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntentDto> {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    const amount = paymentIntent.amount / 100;
    const currency = paymentIntent.currency;
    const status = paymentIntent.status;
    const userId = parseInt(paymentIntent.metadata.userId);
    const projectId = paymentIntent.metadata.projectId;
    const date = new Date(paymentIntent.created * 1000).toISOString();
    const paymentMethod = paymentIntent.payment_method;

    return {userId, projectId, amount, currency, status, date, paymentMethod, paymentIntentId};
  }

  async getPaymentsByUser(id: number) : Promise<Payment[]> {
    const payments = await this.paymentReposiory.createQueryBuilder('payment')
      .where('payment.userId = :id', { id: id })
      .getMany();

    return payments;
  }

  async getPaymentsIntentByUser(id: number) : Promise<PaymentMethodTotalDto[]> {
    const payments = await this.getPaymentsByUser(id);
    const paymentIntentsPromises = payments.map(payment => this.getPaymentIntent(payment.paymentIntentId));
    const paymentIntents = await Promise.all(paymentIntentsPromises); 
  
    const paymentMethods: PaymentMethodTotalDto[] = await Promise.all(
      paymentIntents.map(async (paymentIntent) => {
        if (typeof paymentIntent.paymentIntentId === 'string') {
          const paymentDetails = await this.paymentReposiory.findOneBy({ paymentIntentId: paymentIntent.paymentIntentId });
          return {
            paymentIntent: paymentIntent.paymentIntentId,
            last4: paymentDetails.last4,
            name: paymentDetails.name,
            brand: paymentDetails.brand,
            amount: paymentIntent.amount,
            status: paymentIntent.status,
            currency: paymentIntent.currency,
            date: paymentIntent.date, 
            projectId: paymentDetails.metadata.projectId,
            paymentMethodId: paymentIntent.paymentMethod,
            address: null,
          };
        } else {
          console.log(paymentIntent);
          throw new Error(`Expected paymentMethod to be string but got ${typeof paymentIntent.paymentMethod}`);
        }
      })
    );
  
    return paymentMethods;
  }


async createPaymentIntent(body: CreatePaymentDto, user: User) {
    const stripe = this.getStripeInstance();
    const convertedAmount = body.amount * 100;
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


  const newPayment = new Payment();
      newPayment.paymentIntentId = paymentIntent.id;
      newPayment.user = user;
      newPayment.date = new Date();
      newPayment.metadata = {
        userId: user.id,
        projectId: body.projectId,
        paymentMethod: ""
    };


    await this.paymentReposiory.save(newPayment);
    
    project.amountRaised = Number(project.amountRaised) + Number(body.amount);

    await this.projectReposiory.save(project);

    this.mailService.sendPaymentConfirmation(user, project, body.amount);

    return { clientSecret: paymentIntent.client_secret };
  
  }

  async getTotalDonations(){
    const monthOrder = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre","novembre", "décembre"];
    const payments = await this.paymentReposiory.createQueryBuilder('payment')
      .getMany();

  async postPaymentMethod(paymentMethodDto: PaymentMethodTotalDto): Promise<PaymentMethodTotalDto> {
    let payment = await this.paymentReposiory.findOneBy({ paymentIntentId: paymentMethodDto.paymentIntent });

    if (payment) {
      payment.amount = paymentMethodDto.amount;
      payment.currency = paymentMethodDto.currency;
      payment.status = paymentMethodDto.status;
      payment.brand = paymentMethodDto.brand;
      payment.last4 = paymentMethodDto.last4;
      payment.name = paymentMethodDto.name;
    } else {
      payment = new Payment();
      payment.paymentIntentId = paymentMethodDto.paymentIntent;
      payment.amount = paymentMethodDto.amount;
      payment.currency = paymentMethodDto.currency;
      payment.status = paymentMethodDto.status;
      payment.brand = paymentMethodDto.brand;
      payment.last4 = paymentMethodDto.last4;
      payment.name = paymentMethodDto.name;
    }

    await this.paymentReposiory.save(payment);

    return paymentMethodDto;
  }
  
    const paymentsIntentsPromises = payments.map(payment => this.getPaymentIntent(payment.paymentIntentId));
    const paymentsIntents = await Promise.all(paymentsIntentsPromises);
    const totalDonations = new Array(12).fill(0);
  
    paymentsIntents.forEach(payment => {
      const date = new Date(payment.date);
      totalDonations[date.getMonth()] += payment.amount;
    });
  
    let totalDonationsPerMonth = {};
    monthOrder.forEach((month, index) => {
      totalDonationsPerMonth[month] = totalDonations[index];
    });
  
    return totalDonationsPerMonth;
  }
}