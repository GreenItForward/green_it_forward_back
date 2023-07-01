import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import {Community} from "@/api/community/community.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommunityController} from "@/api/community/community.controller";
import {UserService} from "@/api/user/user.service";
import {UserModule} from "@/api/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Community]), UserModule],
  providers: [CommunityService],
  controllers: [CommunityController],
  exports: [CommunityService],
})
export class CommunityModule {}
