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

  @Column()
  type: string;

  @Column()
  issue: string;

  @Column()
  description: string;

  @Column()
  article: string;

  @ManyToOne(() => User, (user) => user.case)
  @JoinColumn()
  user: User;
}
//
