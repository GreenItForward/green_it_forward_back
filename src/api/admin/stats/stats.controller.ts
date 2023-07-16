import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    UseGuards,
    UseInterceptors
  } from "@nestjs/common";
  import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
  import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { StatsService } from "./stats.service";
import { Roles } from "@/api/user/role/role.decorator";
import { RoleEnum } from "@/common/enums/role.enum";
import { RolesGuard } from "@/api/user/role/role.guard";
  
  @ApiTags('Stats')
  @Controller('stats')
  export class StatsController {
    constructor(private readonly statsService: StatsService) {}

    @Get('total-users')
    async getTotalUsers(): Promise<number> {
        try {
            return await this.statsService.getTotalUsers();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('total-projects')
    async getTotalProjects(): Promise<number> {
        try {
            return await this.statsService.getTotalProjects();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Get('users-per-month/:year')
    @ApiBearerAuth()
    @Roles(RoleEnum.ADMINISTRATEUR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async getUsersPerMonth(@Param('year', new ParseIntPipe()) year: number): Promise<{[key: string]: number}> {
        try {
            return await this.statsService.getUsersPerMonth(year);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}