import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Request } from '../../request/entities/request.entity';
@Entity({ name: 'type_right' })
export class TypeRight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true, type: 'jsonb' })
  type_trouble: JSON;

  @OneToMany(() => Request, (request) => request.type_right)
  request: Request[];
}
