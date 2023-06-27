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
  import { Response } from 'express';
  import { ApiTags } from "@nestjs/swagger";
  import { JwtAuthGuard } from "@/api/user/auth/auth.guard";
import { StatsService } from "./stats.service";
  
  @ApiTags('Stats')
  @Controller('stats')
  export class StatsController {
    constructor(private readonly statsService: StatsService) {}

    @Get('total-users')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async getTotalUsers(): Promise<number> {
        try {
            return await this.statsService.getTotalUsers();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('total-projects')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async getTotalProjects(): Promise<number> {
        try {
            return await this.statsService.getTotalProjects();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('total-donations')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async getTotalDonations(): Promise<number> {
        try {
            throw new HttpException("Not implemented yet", HttpStatus.INTERNAL_SERVER_ERROR)
            //return await this.statsService.getTotalDonations();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('users-per-month/:year')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async getUsersPerMonth(@Param('year', new ParseIntPipe()) year: number): Promise<{[key: string]: number}> {
        try {
            return await this.statsService.getUsersPerMonth(year);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}