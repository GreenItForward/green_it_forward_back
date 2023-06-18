import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommunityService } from './community.service';

@Controller('community')
export class CommunityController {
  constructor(private readonly mailService: CommunityService) {}

  @Get('test')
  async ping() {
    return await this.mailService.pong();
  }
}
