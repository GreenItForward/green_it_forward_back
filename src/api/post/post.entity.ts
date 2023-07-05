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
import {Community} from "@/api/community/community.entity";
import {Message} from "@/api/message/message.entity";

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
  @ManyToOne(() => Community, (community) => community.posts)
  @JoinColumn() 
  community: Promise<Community>;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn() 
  author: User;


  @ApiProperty()
  @OneToMany(() => Message, (message) => message.post)
  @JoinTable()
  messages: Message[];
}
