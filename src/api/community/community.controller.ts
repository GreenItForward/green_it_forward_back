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
import { CommunityService } from './community.service';
import { UserService } from '../user/user.service';
import { Community } from './community.entity';
import { CreateCommunityDto } from './community.dto';

@Controller('communities')
export class CommunityController {
  @Inject(CommunityService)
  private readonly service: CommunityService;

  @Inject(UserService)
  private readonly userService: UserService;

  @Get('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllByUser(@Req() { user }: Request): Promise<Community[]> {
    return this.service.getAllByUser(<User>user);
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAll(): Promise<Community[]> {
    return this.service.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateCommunityDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async create(
    @Body() body: CreateCommunityDto,
    @Req() { user }: Request,
  ): Promise<Community> {
    return this.service.create(body, <User>user);
  }
}
