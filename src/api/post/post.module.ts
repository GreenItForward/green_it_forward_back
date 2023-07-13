import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "@/api/user/user.module";
import {PostController} from "@/api/post/post.controller";
import {PostService} from "@/api/post/post.service";
import {Post} from "@/api/post/post.entity";
import {Community} from "@/api/community/community.entity";
import {Message} from "@/api/message/message.entity";
import {ResponseEntity} from "@/api/response/response.entity";
import {CommunityService} from "@/api/community/community.service";
import {MessageService} from "@/api/message/message.service";
import {ResponseService} from "@/api/response/response.service";

@Module({
  imports: [TypeOrmModule.forFeature([Post]),TypeOrmModule.forFeature([Message]),TypeOrmModule.forFeature([ResponseEntity]), UserModule],
  providers: [PostService, MessageService, ResponseService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
