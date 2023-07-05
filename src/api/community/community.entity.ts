import {
  BaseEntity,
  Column,
  Entity, JoinTable, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { User } from '../user/user.entity';
import {ApiProperty} from "@nestjs/swagger";
import {Post} from "@/api/post/post.entity";

@Entity()
@Unique(['name'])
export class Community extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  imgUrl: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.communities)
  @JoinTable()
  user: User;

  @ApiProperty()
  @ManyToMany(() => User)
  @JoinTable()
  followers: User[];

  @ApiProperty()
  @OneToMany(() => Post, (post) => post.community)
  @JoinTable()
  posts: Post[];
}
