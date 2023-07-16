import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paymentIntentId: string;

  @ManyToOne(() => User, (user: User) => user.id, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('timestamp')
  date: Date;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  last4: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  brand: string;

  @Column('jsonb')
  metadata: {
    userId: number;
    projectId: string;
    paymentMethod: string;
  };
}
 