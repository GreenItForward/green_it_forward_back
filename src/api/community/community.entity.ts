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
  user: User;

  @ApiProperty()
  @OneToMany(() => Community, (community) => community.user)
  communities: Community[];

  @ApiProperty()
  @ManyToMany(() => User)
  @JoinTable()
  followers: User[];
}
