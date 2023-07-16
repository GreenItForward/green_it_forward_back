import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { ResponseService } from './response.service';
import {ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "@/api/user/auth/auth.guard";
import {User} from "@/api/user/user.entity";
import {ResponseEntity} from "@/api/response/response.entity";
import {CreateResponseDto} from "@/api/response/response.dto";
import {Post as PostEntity} from "@/api/post/post.entity";

@Controller('response')
@ApiTags('Response')
export class ResponseController {
  @Inject(ResponseService)
  private readonly service: ResponseService; 

  @Get('user')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Searched Posts successfully retrieve',
    type: PostEntity,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllByUser(@Req() { user }: Request): Promise<ResponseEntity[]> {
    return this.service.getAllByUser(<User>user);
  }

  @Get('message/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllByMessage(@Param('id') messageId: string): Promise<ResponseEntity[]> {
    return this.service.getAllByMessage(parseInt(messageId));
  }

  @Get('getone/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getResponseById(@Param('id') id: string): Promise<ResponseEntity> {
    return this.service.getResponseById(parseInt(id));
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAll(): Promise<ResponseEntity[]> {
    return this.service.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateResponseDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async create(
    @Body() body: CreateResponseDto,
    @Req() { user }: Request,
  ): Promise<ResponseEntity> {
    return this.service.create(body, <User>user);
  }
}
