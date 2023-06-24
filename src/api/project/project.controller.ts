import { Controller, Get, Param, Post, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto';
import { ApiTags } from '@nestjs/swagger';
import { Project } from './project.entity';
import { JwtAuthGuard } from '../user/auth/auth.guard';

@Controller('project')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllProjects(): Promise<Project[]> {
    return await this.projectService.getAllProjects();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProjectById(@Param('id') id: string): Promise<Project> {
    return await this.projectService.getProjectById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.createProject(createProjectDto);
  }

  @Get('random')
  async getRandomProjects(): Promise<Project[]> {
    return await this.projectService.getRandomProjects();
  }
}
