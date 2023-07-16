import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "@/api/user/user.entity";
import {ResponseEntity} from "@/api/response/response.entity";
import {CreateResponseDto} from "@/api/response/response.dto";

@Injectable()
export class ResponseService {
  @InjectRepository(ResponseEntity)
  private readonly repository: Repository<ResponseEntity>;

  public async getAll(): Promise<ResponseEntity[]> {
    return this.repository.find();
  }

  public async create(
    body: CreateResponseDto,
    user: User,
  ): Promise<ResponseEntity> {
    const response = new ResponseEntity();
    response.message = body.message;
    response.text = body.text;
    response.user = user;
    response.creationDate = new Date()
    return this.repository.save(response);
  }

  public async getResponseById(id: number): Promise<ResponseEntity> {
    const response = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!response) {
      throw new NotFoundException('Did not find response');
    }

    return response;
  }


  public async getAllByUser(user: User): Promise<ResponseEntity[]> {
    const userId = user.id;
    const responses = await this.repository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!responses || responses.length === 0) {
      return []
    }

    return responses;
  }

  public async getAllByMessage(messageId: number): Promise<ResponseEntity[]> {
    const responses = await this.repository.find({
      where: { message: { id: messageId } },
      relations: ['message'],
    });

    if (!responses || responses.length === 0) {
      return []
    }

    return responses;
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
