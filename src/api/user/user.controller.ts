import { diskStorage } from 'multer';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ParseFilePipe, FileTypeValidator, MaxFileSizeValidator
} from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { MeDto, UpdateUserDto, VerifyUserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "@/api/user/role/role.decorator";
import { RoleEnum } from "@/common/enums/role.enum";
import { RolesGuard } from "@/api/user/role/role.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path/posix";
import { RegisterDto } from "./auth/auth.dto";

@ApiTags('User')
@Controller('user') 
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;
 

  @Put('edit')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateUser(@Body() body: UpdateUserDto, @Req() { user }: Request): Promise<MeDto> {
    return this.service.updateUser(body, <User>user);
  }

  @Put('edit-image')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
  private editWithImage(@Req() { user } : Request,    
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
      ],
    }),
  )
  file: Express.Multer.File): Promise<MeDto> {
    return this.service.updateImage(<User>user, file);
  }

  
  @Post('verify')
  @ApiBearerAuth()
  private async verifyUser(@Body() body: VerifyUserDto) {
    return this.service.verifyUser(body.token);
  }

  @Get('admin')
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMINISTRATEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async admin(): Promise<User[]> {
    return await this.service.admin();
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async getMe(@Req() req: Request): Promise<MeDto> {
    const user = req.user as User;
    let base64Image = null;
    if (user.imageUrl) {
      base64Image = await this.service.getBase64Image(user.imageUrl);
    }

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        lastLoginAt: user.lastLoginAt,
        firstLoginAt: user.firstLoginAt,
        imageUrl: base64Image
      };
  }
  

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async getUser(@Param('id') userId:number): Promise<User | never> {
    const id =  Number(userId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.service.getUser(id);
  }
}