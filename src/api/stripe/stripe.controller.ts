import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req
} from "@nestjs/common";
import { StripeService } from './stripe.config';
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { CreatePaymentDto, PaymentIntentDto, PaymentMethodDto } from "@/api/stripe/stripe.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./stripe.entity";

@ApiTags('Payments')
@Controller('payments') 
export class StripeController {
  @InjectRepository(Payment)
  private readonly paymentReposiory: Repository<Payment>;
  
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreatePaymentDto })
  async createPaymentIntent(@Body() body: CreatePaymentDto, @Req() req) {
    const stripe = this.stripeService.getStripeInstance();
    const convertedAmount = Math.round(body.amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertedAmount,
      currency: 'eur',
      metadata: { userId: req.user.id, projectId: body.projectId },
    });


    await this.paymentReposiory.save({
      paymentIntentId: paymentIntent.id,
      user: req.user,
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  @Get('payment-method/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPaymentMethod(@Param('id') id: string): Promise<PaymentMethodDto | null> {
    return await this.stripeService.getPaymentMethod(id);
  }

  @Get('payment-intent/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPaymentIntent(@Param('id') id: string): Promise<PaymentIntentDto> {
    return await this.stripeService.getPaymentIntent(id);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPaymentsIntentByUser(@Req() req) : Promise<PaymentIntentDto[]> {
    return await this.stripeService.getPaymentsIntentByUser(req.user.id);
  }

}
