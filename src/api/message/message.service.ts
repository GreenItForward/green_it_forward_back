import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "@/api/user/user.entity";
import {Message} from "@/api/message/message.entity";
import {CreateMessageDto} from "@/api/message/message.dto";
import { ResponseService } from "@/api/response/response.service";

@Injectable()
export class MessageService {
  @InjectRepository(Message)
  private readonly repository: Repository<Message>;

  constructor(private responseService: ResponseService) { }

  public async getAll(): Promise<Message[]> {
    return this.repository.find();
  }

  public async create(
    body: CreateMessageDto,
    user: User,
  ): Promise<Message> {
    const message = new Message();
    message.post = body.post;
    message.text = body.text;
    message.authorId = user.id;
    message.creationDate = new Date()
    return this.repository.save(message);
  }

  public async getMessageById(id: number): Promise<Message> {
    const message = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!message) {
      throw new NotFoundException('Did not find message');
    }

    return message;
  }


  public async getAllByUser(user: User): Promise<Message[]> {
    const userId = user.id;
    const messages = await this.repository.find({
      where: { authorId: userId },
    });

    if (!messages || messages.length === 0) {
      return []
    }

    return messages;
  }

  public async getAllByPost(postId: number, currentUser: User): Promise<Message[]> {
    const messages = await this.repository.find({
      where: { post: { id: postId } },
      relations: ['post'],
    });

    if (!messages || messages.length === 0) {
      return []
    }

    const messagesNotBlocked:Message[] = [];
    for(const message of messages) {
      if(!currentUser.idsBlocked.includes(message.authorId)) {
        messagesNotBlocked.push(message);
      }
    }

    if (!messagesNotBlocked || messagesNotBlocked.length === 0) {
      return []
    }

    return messagesNotBlocked;
  }

  public async delete(id: number, currentUser: User): Promise<void> {
    const responses = await this.responseService.getAllByMessage(id, currentUser);
    for (const response of responses) {
      await this.responseService.delete(response.id);
    }
    await this.repository.delete(id);
  }
}
