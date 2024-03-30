import { Case } from '../../case/entities/case.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  education: string;

  @Column()
  length_of_service: number;

  @Column()
  retraining: string;

  @OneToMany(() => Case, 'portfolioId')
  case: Case[];

  @ManyToOne(() => User, (user) => user.portfolio)
  @JoinColumn()
  user: User;
}
