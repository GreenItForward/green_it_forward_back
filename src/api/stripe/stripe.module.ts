import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.config';
import { Payment } from './stripe.entity';
import { Project } from '../project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment,Project])],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}