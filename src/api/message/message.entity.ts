import {
  BaseEntity,
  Column,
  Entity, JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { User } from '../user/user.entity';
import {ApiProperty} from "@nestjs/swagger";
import {Community} from "@/api/community/community.entity";
import {Post} from "@/api/post/post.entity";

@Entity()
export class Message extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @ManyToOne(() => Post, (post) => post.messages)
  @JoinTable()
  post: Post;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.posts)
  @JoinTable()
  author: User;
}
