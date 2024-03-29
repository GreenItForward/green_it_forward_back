import { Payment } from './../../stripe/stripe.entity';
import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Project } from '@/api/project/project.entity';
import { StripeService } from './../../stripe/stripe.config';

@Module({
    imports: [TypeOrmModule.forFeature([User, Project])],
    controllers: [StatsController],
    providers: [StatsService],
})
export class StatsModule {}
