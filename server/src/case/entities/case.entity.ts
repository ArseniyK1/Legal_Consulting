import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  issue: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  article: string;

  @ManyToOne(() => User, (user) => user.case)
  @JoinColumn()
  user: User;
}
