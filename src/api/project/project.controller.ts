import { Controller, Get, Param, Post, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor, ParseUUIDPipe, HttpException, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Project } from './project.entity';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { User } from '../user/user.entity';

@Controller('project')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllProjects(): Promise<Project[]> {
    return await this.projectService.getAllProjects();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProjectById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Project> {
    return await this.projectService.getProjectById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreateProjectDto })
  async createProject(@Req() req, @Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.createProject(<User>req.user, createProjectDto);
  }

  @Get('random/:count')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getRandomProjects(@Param('count') count: number): Promise<Project[]> {
     return await this.projectService.getRandomProjects(count);
  }
}
   