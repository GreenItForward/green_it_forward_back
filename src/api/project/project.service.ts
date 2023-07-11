import { User } from '@/api/user/user.entity';
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

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find( { relations: ['createdBy'] });
  }

  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ 
      where: { id }, 
      relations: ['createdBy'] 
    });
    
    if (!project) {
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    }
    
    return project;
}

  getRandomProjects(count:number): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder()
      .leftJoinAndSelect('project.createdBy', 'user')
      .orderBy('RANDOM()')
      .limit(count)
      .getMany();
  }

  async createProject(user: User, project: CreateProjectDto): Promise<Project> {
    const correctDate = convertToDate(project.startDate);

    const userEntity = await this.userRepository.findOneBy({ id: user.id });
    if (!userEntity) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newProject = this.projectRepository.create({
      ...project,
      startDate: correctDate,
      createdBy: user,
    });
  
    return await this.projectRepository.save(newProject);
  }
  
}
