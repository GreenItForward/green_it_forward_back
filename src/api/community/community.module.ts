import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import {Community} from "@/api/community/community.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommunityController} from "@/api/community/community.controller";
import {UserModule} from "@/api/user/user.module";
import {PostService} from "@/api/post/post.service";
import {Post} from "@/api/post/post.entity";
import {ResponseEntity} from "@/api/response/response.entity";
import {Message} from "@/api/message/message.entity";
import {MessageService} from "@/api/message/message.service";
import {ResponseService} from "@/api/response/response.service";

@Module({
  imports: [TypeOrmModule.forFeature([Community]),TypeOrmModule.forFeature([Post]),TypeOrmModule.forFeature([Message]),TypeOrmModule.forFeature([ResponseEntity]), UserModule],
  providers: [CommunityService, PostService, MessageService, ResponseService],
  controllers: [CommunityController],
  exports: [CommunityService],
})
export class CommunityModule {}
