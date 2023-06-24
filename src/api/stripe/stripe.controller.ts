import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";
import { StripeService } from './stripe.service';
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { CreatePaymentDto, PaymentIntentDto, PaymentMethodDto } from "@/api/stripe/stripe.dto";

@ApiTags('Payments')
@Controller('payments')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreatePaymentDto })
  async createPaymentIntent(@Body() body: CreatePaymentDto) {
    const stripe = this.stripeService.getStripeInstance();
    const convertedAmount = Math.round(body.amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertedAmount,
      currency: 'eur',
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
}
