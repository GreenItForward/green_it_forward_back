import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";
import { Address } from "@stripe/stripe-js";

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
  @ApiProperty()
  public readonly amount: number;

  @IsString()
  @ApiProperty()
  public readonly currency: string;

  @IsString()
  @ApiProperty()
  public readonly status: string;
}