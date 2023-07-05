import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "@/api/user/user.entity";
import {Post} from "@/api/post/post.entity";
import {CreatePostDto} from "@/api/post/post.dto";

@Injectable()
export class PostService {
  @InjectRepository(Post)
  private readonly repository: Repository<Post>;

  public async getAll(): Promise<Post[]> {
    return this.repository.find();
  }

  public async create(
    body: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const post = new Post();
    post.subject = body.subject;
    post.text = body.text;
    post.communityId = body.communityId;
    post.author = user;
    return this.repository.save(post);
  }

  public async getPostById(id: number): Promise<Post> {
    const post = await this.repository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Did not find post');
    }

    return post;
  }


  public async getAllByUser(user: User): Promise<Post[]> {
    const userId = user.id;
    const posts = await this.repository.find({
      where: { author: { id: userId } },
      relations: ['author'],
    });

    if (!posts || posts.length === 0) {
      throw new NotFoundException('No posts found');
    }

    return posts;
  }

  public async getAllByCommunity(communityId: number): Promise<Post[]> {
    const posts = await this.repository.find({
      where: { communityId: communityId }
    });

    if (!posts || posts.length === 0) {
      throw new NotFoundException('No posts found');
    }

    return posts;
  }
}
