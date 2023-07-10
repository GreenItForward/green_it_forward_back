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
import {Message} from "@/api/message/message.entity";

@Entity()
export class ResponseEntity extends BaseEntity {
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
  @ManyToOne(() => Message, (message) => message.responses)
  @JoinColumn()
  message: Promise<Message>;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.posts)
  @JoinTable()
  user: User;
}
