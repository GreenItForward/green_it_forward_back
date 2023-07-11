import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Brackets, Repository} from 'typeorm';
import {User} from "@/api/user/user.entity";
import {Post} from "@/api/post/post.entity";
import {CreatePostDto} from "@/api/post/post.dto";

@Injectable()
export class PostService {
  @InjectRepository(Post)
  private readonly repository: Repository<Post>;

  public async getAll(): Promise<Post[]> {
    return this.repository.find({
      relations: ['user'],
    });
  }

  public async create(
    body: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const post = new Post();
    post.subject = body.subject;
    post.text = body.text;
    post.community = body.community;
    post.user = user;
    post.creationDate = new Date()
    return this.repository.save(post);
  }

  public async getPostById(id: number): Promise<Post> {
    const post = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('Did not find post');
    }

    return post;
  }


  public async getAllByUser(user: User): Promise<Post[]> {
    const userId = user.id;
    const posts = await this.repository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!posts || posts.length === 0) {
      return []
    }

    return posts;
  }

  public async getAllByCommunity(communityId: number): Promise<Post[]> {
    const posts = await this.repository.find({
      where: { community: { id: communityId } },
      relations: ['user'],
    });

    if (!posts || posts.length === 0) {
      return []
    }

    return posts;
  }

  public async searchPostsInCommunity(communityId: number, searchString: string): Promise<Post[]> {
    return await this.repository
        .createQueryBuilder('post')
        .leftJoin('post.community', 'community')
        .leftJoinAndSelect('post.user', 'user')
        .where('community.id = :communityId', {communityId})
        .andWhere(
            new Brackets(qb => {
              qb.where('LOWER(post.subject) LIKE LOWER(:searchString)', {searchString: `%${searchString}%`})
                  .orWhere('LOWER(post.text) LIKE LOWER(:searchString)', {searchString: `%${searchString}%`});
            }),
        )
        .getMany();
  }
}
