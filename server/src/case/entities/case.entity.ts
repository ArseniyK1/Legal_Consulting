import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';

@Entity()
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  success: boolean;

  @Column()
  description: string;

  @Column()
  article: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.case)
  @JoinColumn()
  portfolio: Portfolio;
}
