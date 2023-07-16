import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Get } from '@nestjs/common';
import { RegisterDto, LoginDto, ChangePasswordDto, TokenResponseDto, ForgotPasswordDto } from './auth.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from '../user.entity';
import { TokenResponse } from '@/common/types/token-response.interface';
import { Response } from 'express';


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
  private register(@Req() { ip }: Request,
  @Body() body: RegisterDto): Promise<User> {
    return this.service.register(body, ip);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User successfully logged in',
    type: TokenResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  private login(@Req() { ip }: Request, @Body() body: LoginDto): Promise<TokenResponse | never> {
    return this.service.login(body, ip);
  } 

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() req: Request): Promise<string | never> {
    return this.service.refresh(<User>req.user, req.ip);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: ChangePasswordDto })
  @ApiOkResponse({
    description: 'Password successfully changed',
    type: User,
  })
  private changePassword(@Req() { user }: Request, @Body() body: ChangePasswordDto): Promise<User> {
    return this.service.changePassword(<User>user, body);
  } 

  @Post('forgot-password')
  @ApiBody({ type: ForgotPasswordDto })
  @ApiOkResponse({
    description: 'Password successfully changed',
    type: User,
  })
  private forgotPassword(@Req() { ip }: Request, @Body() body: ForgotPasswordDto, res: Response): Promise<void> {
    return this.service.forgotPassword(body, res, ip);
  }

  @Get('login-token')
  private loginToken(@Body() body: User): Promise<TokenResponse | never> {
    return this.service.getLoginToken(<User>body);
  }
  
} 