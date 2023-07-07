import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../user/user.entity';
  import { Project } from '../project/project.entity';
  
  @Entity()
  export class Stripe {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    paymentIntentId: string;
  
    @ManyToOne(() => User, (user: User) => user.id, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;
  }
  