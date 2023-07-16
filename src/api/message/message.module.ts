import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "@/api/user/user.module";
import {Message} from "@/api/message/message.entity";
import {MessageService} from "@/api/message/message.service";
import {MessageController} from "@/api/message/message.controller";
import { ResponseModule } from "@/api/response/response.module";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule, ResponseModule],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
