import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "@/api/user/user.module";
import {ResponseEntity} from "@/api/response/response.entity";
import {ResponseService} from "@/api/response/response.service";
import {ResponseController} from "@/api/response/response.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ResponseEntity]), UserModule],
  providers: [ResponseService],
  controllers: [ResponseController],
  exports: [ResponseService],
})
export class ResponseModule {}
