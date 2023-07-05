import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "@/api/user/user.module";
import {PostController} from "@/api/post/post.controller";
import {PostService} from "@/api/post/post.service";
import {Post} from "@/api/post/post.entity";
import {Message} from "@/api/message/message.entity";
import {MessageService} from "@/api/message/message.service";
import {MessageController} from "@/api/message/message.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
