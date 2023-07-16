import {
  BaseEntity,
  Column,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {Message} from "@/api/message/message.entity";

@Entity()
export class ResponseEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Column()
  public text: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty()
  public creationDate: Date | null;

  @ApiProperty()
  @ManyToOne(() => Message, (message) => message.responses)
  @JoinColumn()
  public message: Promise<Message>;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  public authorId: number;
}
