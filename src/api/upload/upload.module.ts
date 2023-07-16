import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "@/api/user/user.module";
import {Post} from "@/api/post/post.entity";
import {UploadService} from "@/api/upload/upload.service";
import {UploadController} from "@/api/upload/upload.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
