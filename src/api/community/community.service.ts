import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Brackets, Repository} from 'typeorm';
import {Community} from './community.entity';
import {User} from "@/api/user/user.entity";
import {CreateCommunityDto} from "@/api/community/community.dto";
import {Post} from "@/api/post/post.entity";

@Injectable()
export class CommunityService {
  @InjectRepository(Community)
  private readonly repository: Repository<Community>;

  public async getAll(): Promise<Community[]> {
    return this.repository.find();
  }

  public async create(
    body: CreateCommunityDto,
    user: User,
  ): Promise<Community> {
    const community = new Community();
    community.name = body.name;
    community.description = body.description;
    community.imgUrl = body.imgUrl;
    community.creationDate = new Date()
    if (body.followers && body.followers.length > 0) {
      const followerIds = body.followers;
      community.followers = await User.findByIds(followerIds);
    }
    community.user = user;

    return this.repository.save(community);
  }

  public async followCommunity(
      id: number,
      user: User,
  ): Promise<Community> {
    const community = await this.getCommunityById(id);
    let followers = await this.getUsersByCommunityId(id)

    if (!followers) {
      followers = [];
    }

    const isUserAlreadyFollowed = followers.some((follower) => follower.id === user.id);
    if (!isUserAlreadyFollowed) {
      followers.push(user)
    }
    else{
      console.log("L'utilisateur suit déjà cette communauté")
    }

    community.followers = followers

    return this.repository.save(community);
  }

  public async unFollowCommunity(
      id: number,
      user: User,
  ): Promise<Community> {
    const community = await this.getCommunityById(id);
    let followers = await this.getUsersByCommunityId(id)

    if (!followers) {
      followers = [];
    }

    const isUserAlreadyFollowed = followers.some((follower) => follower.id === user.id);
    if (isUserAlreadyFollowed) {
      community.followers = followers.filter((follower) => follower.id !== user.id);
    }
    else{
      console.log("L'utilisateur ne suis pas cette communauté")
    }

    return this.repository.save(community);
  }


  public async getCommunityById(id: number): Promise<Community> {
    const community = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!community) {
      throw new NotFoundException('Did not find community');
    }

    return community;
  }


  public async getIdbyCommunity(community: Community): Promise<number> {
    if (!community) {
      throw new NotFoundException('Could not find community');
    }

    const foundCommunity = await this.repository.findOne({
      where: { id: community.id },
    });

    if (!foundCommunity) {
      throw new NotFoundException('Could not find community');
    }

    return foundCommunity.id;
  }

  public async getUsersByCommunityId(communityId: number): Promise<User[]> {
    const community = await this.repository.findOne({ where: { id: communityId }, relations: ['followers'] });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community.followers;
  }

  public async getAllByUser(user: User): Promise<Community[]> {
    const userId = user.id;
    const community = await this.repository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!community || community.length === 0) {
      throw new NotFoundException('No communities found');
    }

    return community;
  }

  public async searchCommunities(searchString: string): Promise<Community[]> {
    return await this.repository
        .createQueryBuilder('community')
        .where('LOWER(community.name) LIKE LOWER(:searchString)', {searchString: `%${searchString}%`})
        .orWhere('LOWER(community.description) LIKE LOWER(:searchString)', {searchString: `%${searchString}%`})
        .getMany();
  }



}
