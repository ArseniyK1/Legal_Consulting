import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Decision } from '../../decision/entities/decision.entity';

@Entity()
export class Trouble {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  suggested_price: string;

  @Column()
  type: string;

  @OneToMany(() => Decision, 'troubleId')
  decision: Decision[];
}
