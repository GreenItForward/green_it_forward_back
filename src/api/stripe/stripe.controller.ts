import { Roles } from '@/api/user/role/role.decorator';
import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { StripeService } from './stripe.config';
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { CreatePaymentDto, PaymentIntentDto, PaymentMethodDto } from "@/api/stripe/stripe.dto";
import { RoleEnum } from '@/common/enums/role.enum';
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
  async getPaymentsIntentByUser(@Req() req) : Promise<PaymentIntentDto[]> {
    return await this.stripeService.getPaymentsIntentByUser(req.user.id);
  }

  @Get('total-donations')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(RoleEnum.ADMINISTRATEUR)
  async getTotalDonations(): Promise<{[key: string]: number}> {
      try {
          return await this.stripeService.getTotalDonations();
      } catch (error) {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
  
}
