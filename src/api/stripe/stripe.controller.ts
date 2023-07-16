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
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { CreatePaymentDto, PaymentIntentDto, PaymentMethodDto, PaymentMethodTotalDto } from "@/api/stripe/stripe.dto";
@ApiTags('Payments')
@Controller('payments') 
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreatePaymentDto })
  async createPaymentIntent(@Body() body: CreatePaymentDto, @Req() req) {
    return await this.stripeService.createPaymentIntent(body, req.user);
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
  @ApiOkResponse({ type: [PaymentIntentDto] })
  async getPaymentsIntentByUser(@Req() req) : Promise<PaymentMethodTotalDto[]> {
    return await this.stripeService.getPaymentsIntentByUser(req.user.id);
  }

  @Post('payment-method')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: PaymentMethodTotalDto })
  @ApiCreatedResponse({ type: PaymentMethodTotalDto })
  async postPaymentMethod(@Body() body: PaymentMethodTotalDto): Promise<PaymentMethodDto> {
    return await this.stripeService.postPaymentMethod(body);
  }
}
