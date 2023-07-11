import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column('decimal')
  amountRaised: number;

  @Column('decimal')
  totalAmount: number;

  @Column('date')
  startDate: Date;
  
  @Column('date')
  endDate: Date;
  
  @ManyToOne(() => User, user => user.projects)
  @JoinColumn({ name: "createdBy" })
  createdBy: User;
}
