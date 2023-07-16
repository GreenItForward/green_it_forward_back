import { Controller, Get, Param, Post, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor, ParseUUIDPipe, HttpException, Req, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, EditProjectDto } from './project.dto';
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

  @Get("ongoing")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getOngoingProjects(): Promise<Project[]> {
    return await this.projectService.getOngoingProjects();
  }


  @Get("finished")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getFinishedProjects(): Promise<Project[]> {
    return await this.projectService.getFinishedProjects();
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

  
  @Get('search/:searchstring')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async searchProjects(@Param('searchstring') searchString: string): Promise<Project[]> {
    return this.projectService.searchProjects(searchString);
  }


  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async editProject(@Req() req, @Param('id', new ParseUUIDPipe()) id: string, @Body() editProjectDto: EditProjectDto): Promise<Project> {
    return await this.projectService.editProject(<User>req.user, id, editProjectDto);
  }
}
   