import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "@/api/user/user.entity";
import {Post} from "@/api/post/post.entity";
import {CreatePostDto} from "@/api/post/post.dto";
import {Message} from "@/api/message/message.entity";
import {CreateMessageDto} from "@/api/message/message.dto";

@Injectable()
export class MessageService {
  @InjectRepository(Message)
  private readonly repository: Repository<Message>;

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
    message.user = user;
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
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!messages || messages.length === 0) {
      return []
    }

    return messages;
  }

  public async getAllByPost(postId: number): Promise<Message[]> {
    const messages = await this.repository.find({
      where: { post: { id: postId } },
      relations: ['post'],
    });

    if (!messages || messages.length === 0) {
      return []
    }

    return messages;
  }
}
