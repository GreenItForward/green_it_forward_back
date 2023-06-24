import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  getProjectById(id: string): Promise<Project> {
    return this.projectRepository.findOneBy({ id });
  }

  getRandomProjects(): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder()
      .orderBy('RANDOM()')
      .limit(5)
      .getMany();
  }

  async createProject(project: CreateProjectDto): Promise<Project> {
    const newProject = this.projectRepository.create(project);
    return await this.projectRepository.save(newProject);
  }
}
