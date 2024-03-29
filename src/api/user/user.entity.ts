import { Exclude } from 'class-transformer';
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "@/common/enums/role.enum";
import { IsEnum } from "class-validator";
import {Community} from "@/api/community/community.entity";
import {Post} from "@/api/post/post.entity";
import { Project } from '../project/project.entity';

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
  public firstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public lastName: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty()
  public lastLoginAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty()
  public firstLoginAt: Date | null;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.MEMBRE })
  @IsEnum(RoleEnum)
  @ApiProperty()
  public role: RoleEnum

  @ApiProperty()
  @ManyToMany(() => Community)
  @JoinTable()
  public communities: Community[];

  @ApiProperty()
  @OneToMany(() => Post, (post) => post.user)
  public posts: Post[];

  @Column({ type: 'varchar', nullable: true, default: null })
  @ApiProperty()
  public ipAddress: string | null;

  @Column({ type: 'boolean', default: false })
  @ApiProperty()
  public isVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public confirmationToken: string | null;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public imageUrl: string | null;

  @OneToMany(() => Project, project => project.createdBy)
  public projects: Project[];

  @Column({ type: 'int', array: true, default: [], nullable: false })
  @ApiProperty()
  public idsBlocked: number[];
}
