import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto';
import { ApiTags } from '@nestjs/swagger';
import { Project } from './project.entity';

@Controller('project')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return await this.projectService.getAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<Project> {
    return await this.projectService.getProjectById(id);
  }

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.createProject(createProjectDto);
  }
}
