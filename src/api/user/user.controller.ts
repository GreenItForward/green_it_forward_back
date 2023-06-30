import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Put,
  Req,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { ChangeRoleDto, UpdateNameDto } from "./user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { RoleEnum } from "@/common/enums/role.enum";
import { RolesGuard } from "@/api/user/roles/roles.guard";
import { Roles } from "@/api/user/roles/roles.decorator";

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
  private async getUser(@Param('id') userId: number): Promise<User | never> {
    return this.service.getUser(userId);
  }

  @Get('role/:userId')
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMINISTRATEUR, RoleEnum.MODERATEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async getRole(@Param('userId') userId: number): Promise<RoleEnum | never> {
    return this.service.getRole(userId);
  }

  @Put('change-role')
  @ApiBody({ type: ChangeRoleDto })
  @ApiBearerAuth()
  @Roles(RoleEnum.ADMINISTRATEUR, RoleEnum.MODERATEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async changeRole(@Body() body:ChangeRoleDto, @Req() { user }: Request): Promise<RoleEnum | never> {
    return this.service.changeRole(body, <User>user);
  }
}