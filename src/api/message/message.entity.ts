import {
  BaseEntity,
  Column,
  Entity, JoinColumn, JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
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
  @Column({ type: 'int', nullable: true })
  public authorId: number;

  @ApiProperty()
  @OneToMany(() => ResponseEntity, (response) => response.message)
  @JoinTable()
  responses: ResponseEntity[];
}
