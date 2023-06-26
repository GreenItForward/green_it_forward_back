import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './project.dto';
import { convertToDate } from '@/common/helper/date.helper';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });
    
    if (!project) {
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    }
    
    return project;
}

  getRandomProjects(count:number): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder()
      .orderBy('RANDOM()')
      .limit(count)
      .getMany();
  }

  async createProject(project: CreateProjectDto): Promise<Project> {
    const correctDate = convertToDate(project.startDate);
    const newProject = this.projectRepository.create({
      ...project,
      startDate: correctDate,
    });
  
    return await this.projectRepository.save(newProject);
  }
  
}
