import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDateString, IsUUID, Max, IsOptional } from "class-validator";
import { Address } from "@stripe/stripe-js";
import Stripe from "stripe";

export class CreatePaymentDto {
  @IsNumber()
  @ApiProperty()
  public readonly amount: number;

  @IsUUID()
  @ApiProperty()
  public readonly projectId: string;
}

export class PaymentMethodDto {
  @IsString()
  @ApiProperty()
  public readonly last4: string;

  @IsString()
  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly address: Address;

  @IsString()
  @ApiProperty()
  public readonly brand: string;
}

export class PaymentIntentDto {
  @IsNumber()
  @ApiProperty()
  public readonly userId: number;

  @IsUUID()
  @ApiProperty()
  public readonly projectId: string;
  
  @IsNumber()
  @Max(1000000000)
  @ApiProperty()
  public readonly amount: number;

  @IsString()
  @ApiProperty()
  public readonly currency: string;

  @IsString()
  @ApiProperty()
  public readonly status: string;

  @IsDateString()
  @ApiProperty()
  public readonly date: string;

  @ApiProperty()
  public readonly paymentMethod: string | Stripe.PaymentMethod;

  @IsString()
  @ApiProperty()
  public readonly paymentIntentId: string;

}

export class PaymentMethodTotalDto {
  @IsString()
  @ApiProperty()
  public readonly paymentIntent: string;

  @IsString()
  @ApiProperty()
  public readonly last4: string;

  @IsString()
  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  @IsOptional()
  public readonly address: Address;

  @IsString()
  @ApiProperty()
  public readonly brand: string;

  @IsNumber()
  @ApiProperty()
  public readonly amount: number;

  @IsString()
  @ApiProperty()
  public readonly status: string;

  @IsString()
  @ApiProperty()
  public readonly currency: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  public readonly date: string;
}