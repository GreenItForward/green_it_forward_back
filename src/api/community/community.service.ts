import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommunityService {
  constructor() {}

  async pong() {
    console.log('test');
  }
}
