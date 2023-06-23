import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req} from '@nestjs/common';
import { RegisterDto, LoginDto } from './auth.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from '../user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({
    description: 'User successfully registered',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  private register(@Body() body: RegisterDto): Promise<string | never> {
    return this.service.register(body);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<User>user);
  }
  
}