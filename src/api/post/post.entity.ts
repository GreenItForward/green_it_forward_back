import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { User } from '../user/user.entity';
import {ApiProperty} from "@nestjs/swagger";
import {Community} from "@/api/community/community.entity";

@Entity()
export class Post extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  subject: string;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @Column()
  communityId: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
