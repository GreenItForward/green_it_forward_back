import { Controller, Body, ClassSerializerInterceptor, Get, Param, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { RoleService } from "./role.service";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "./role.guard";
import { Roles } from "./role.decorator";
import { RoleEnum } from "@/common/enums/role.enum";
import { ChangeRoleDto } from "./user.dto";
import { User } from "../user.entity";

@ApiTags('Roles')
@Controller('role')
export class RoleController {
    constructor(private readonly service: RoleService) {}

    @Get('user')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private async getUserRole(@Req() req: Request): Promise<{role: RoleEnum} | never> {
    return { role: await this.service.getUserRole(req) };
    }

    @Get('user/:userId')
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

    @Get('all')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private getAllRoles(): Promise<RoleEnum[] | never> {
    return this.service.getAllRoles();
    }
}