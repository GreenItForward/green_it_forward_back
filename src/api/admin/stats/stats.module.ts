import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [StatsController],
    providers: [StatsService],
})
export class StatsModule {}
