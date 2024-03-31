import { Feedback } from '../../feedback/entities/feedback.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Decision {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: string;

  @Column()
  selected: boolean;

  @OneToMany(() => Feedback, 'decisionId')
  feedback: Feedback[];
}
