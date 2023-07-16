import { User } from '@/api/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './project.dto';
import moment from 'moment';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find({ 
      relations: ['createdBy'],
      order: {
        startDate: 'DESC',
      },
    });
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
    const userEntity = await this.userRepository.findOneBy({ id: user.id });
    if (!userEntity) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (moment(project.endDate).isBefore(moment())) {
      throw new HttpException('La date de fin doit être supérieure à la date du jour', HttpStatus.BAD_REQUEST);
    }

    const newProject = this.projectRepository.create({
      ...project,
      amountRaised: 0,
      startDate: new Date(),
      createdBy: user,
    });
  
    return await this.projectRepository.save(newProject);
  }

  public async searchProjects(searchString: string): Promise<Project[]> {
    return await this.projectRepository
        .createQueryBuilder('project')
        .where('LOWER(project.name) LIKE LOWER(:searchString)', {searchString: `%${searchString}%`})
        .orWhere('LOWER(project.description) LIKE LOWER(:searchString)', {searchString: `%${searchString}%`})
        .getMany();
  }
  
}
