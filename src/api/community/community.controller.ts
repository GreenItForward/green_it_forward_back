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
import {ApiBearerAuth, ApiBody} from "@nestjs/swagger";
import {JwtAuthGuard} from "@/api/user/auth/auth.guard";
import {User} from "@/api/user/user.entity";

@Controller('communities')
export class CommunityController {
  @Inject(CommunityService)
  private readonly service: CommunityService;

  private readonly userService: UserService;

  @Get('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllByUser(@Req() { user }: Request): Promise<Community[]> {
    return this.service.getAllByUser(<User>user);
  }

  @Get('community/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getCommunityById(@Param('id') id: string): Promise<Community> {
    return this.service.getCommunityById(parseInt(id));
  }

  @Post('community/:id/follow')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async followCommunity(
      @Req() { user }: Request, @Param('id') id: string
  ): Promise<Community> {
    return this.service.followCommunity(parseInt(id),<User>user);
  }

  @Post('community/:id/unfollow')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async unFollowCommunity(
      @Req() { user }: Request, @Param('id') id: string
  ): Promise<Community> {
    return this.service.unFollowCommunity(parseInt(id),<User>user);
  }

  @Get('community/:id/users')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getCommunityUsers(@Param('id') id: string): Promise<User[]> {
    return this.service.getUsersByCommunityId(parseInt(id));
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
