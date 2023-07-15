import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { Request } from 'express';
import { MessageService } from './message.service';
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "@/api/user/auth/auth.guard";
import {User} from "@/api/user/user.entity";
import {Message} from "@/api/message/message.entity";
import {CreateMessageDto} from "@/api/message/message.dto";
import { Roles } from "@/api/user/role/role.decorator";
import { RoleEnum } from "@/common/enums/role.enum";
import { RolesGuard } from "@/api/user/role/role.guard";

@Controller('message')
@ApiTags('Message')
export class MessageController {
  @Inject(MessageService)
  private readonly service: MessageService;

  @Get('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllByUser(@Req() { user }: Request): Promise<Message[]> {
    return this.service.getAllByUser(<User>user);
  }

  @Get('post/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAllByPost(@Param('id') communityId: string): Promise<Message[]> {
    return this.service.getAllByPost(parseInt(communityId));
  }

  @Get('getone/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getMessageById(@Param('id') id: string): Promise<Message> {
    return this.service.getMessageById(parseInt(id));
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getAll(): Promise<Message[]> {
    return this.service.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateMessageDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async create(
    @Body() body: CreateMessageDto,
    @Req() { user }: Request,
  ): Promise<Message> {
    return this.service.create(body, <User>user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMINISTRATEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(parseInt(id));
  }
}
