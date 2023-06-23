import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  @ApiProperty()
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty()
  public lastLoginAt: Date | null;
}