import {
  BaseEntity,
  Column,
  Entity, JoinColumn, JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { User } from '../user/user.entity';
import {ApiProperty} from "@nestjs/swagger";
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
  @JoinColumn()
  post: Promise<Post>;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.posts)
  @JoinTable()
  author: User;
}
