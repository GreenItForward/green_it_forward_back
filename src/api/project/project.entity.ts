import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  
  @Column()
  createdBy: string;
}
