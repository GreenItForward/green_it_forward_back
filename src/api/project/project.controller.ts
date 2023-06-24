import { Controller, Get, Param, Post, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor, ParseUUIDPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, GetProjectById } from './project.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Project } from './project.entity';
import { JwtAuthGuard } from '../user/auth/auth.guard';

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
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.createProject(createProjectDto);
  }

  @Get('random')
  @ApiBearerAuth()
  async getRandomProjects(): Promise<Project[]> {
    return await this.projectService.getRandomProjects();
  }
}
   