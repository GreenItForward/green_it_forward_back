import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { RegisterDto, LoginDto } from './auth.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from '../user.entity';
import { TokenResponse } from '@/common/types/token-response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService) 
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, callback) => {
        const name = `${Date.now()}${extname(file.originalname)}`;
        callback(null, name);
      }
    }),
  }))
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({
    description: 'User successfully registered',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  private register(@Req() { ip }: Request,    
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
      ],
    }),
  )
  file: Express.Multer.File,
  @Body() body: RegisterDto): Promise<User> {
    return this.service.register(body, file, ip);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User successfully logged in',
    type: User,
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
}