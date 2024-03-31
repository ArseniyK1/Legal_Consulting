import { Feedback } from '../../feedback/entities/feedback.entity';
import { Trouble } from '../../trouble/entities/trouble.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column()
  lawyerId: number;

  @OneToMany(() => Trouble, 'requestId')
  trouble: Trouble[];

  @ManyToOne(() => User, (user) => user.request)
  @JoinColumn()
  user: User;
}
