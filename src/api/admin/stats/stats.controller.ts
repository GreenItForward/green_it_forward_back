import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Query,
    Res,
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

    // total projects
    @Get('total-projects')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async getTotalProjects(): Promise<number> {
        try {
            throw new HttpException("Not implemented yet", HttpStatus.INTERNAL_SERVER_ERROR)
            //return await this.statsService.getTotalProjects();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // total donations
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

    // nb of registered users per month
    @Get('users-per-month')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async getUsersPerMonth(): Promise<number[]> {
        try {
            throw new HttpException("Not implemented yet", HttpStatus.INTERNAL_SERVER_ERROR)
            //return await this.statsService.getUsersPerMonth();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}