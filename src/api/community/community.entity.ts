import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Community extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nom: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.communities)
  user: User;

  @ApiProperty()
  @OneToMany(() => Community, (community) => community.user)
  communities: Community[];
}
