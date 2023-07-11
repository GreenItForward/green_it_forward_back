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
import {ResponseEntity} from "@/api/response/response.entity";

@Entity()
export class Message extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  text: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty()
  public creationDate: Date | null;

  @ApiProperty()
  @ManyToOne(() => Post, (post) => post.messages)
  @JoinColumn()
  post: Promise<Post>;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.posts)
  @JoinTable()
  user: User;

  @ApiProperty()
  @OneToMany(() => ResponseEntity, (response) => response.message)
  @JoinTable()
  responses: ResponseEntity[];
}