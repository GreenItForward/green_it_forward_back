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
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { UpdateNameDto, VerifyUserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;
 

  @Put('name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(@Body() body: UpdateNameDto, @Req() req: Request): Promise<User> {
    return this.service.updateName(body, req);
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

  @Post('verify')
  @ApiBearerAuth()
  async verifyUser(@Body() body: VerifyUserDto) {
    return this.service.verifyUser(body.token);
  }
 

}