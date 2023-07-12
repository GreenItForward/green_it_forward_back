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
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import {CreatePostDto} from './post.dto';
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "@/api/user/auth/auth.guard";
import {User} from "@/api/user/user.entity";

@Controller('post')
@ApiTags('Post')
export class PostController {
  @Inject(PostService)
  private readonly service: PostService;

  @Get('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllByUser(@Req() { user }: Request): Promise<PostEntity[]> {
    return this.service.getAllByUser(<User>user);
  }

  @Get('community/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllByCommunity(@Param('id') communityId: string): Promise<PostEntity[]> {
    return this.service.getAllByCommunity(parseInt(communityId));
  }

  @Get('getone/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.service.getPostById(parseInt(id));
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAll(): Promise<PostEntity[]> {
    return this.service.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreatePostDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async create(
    @Body() body: CreatePostDto,
    @Req() { user }: Request,
  ): Promise<PostEntity> {
    return this.service.create(body, <User>user);
  }
}
