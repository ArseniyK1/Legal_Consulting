import { Feedback } from '../../feedback/entities/feedback.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../../roles/entities/roles.entity';
import { User } from '../../user/entities/user.entity';
import { TypeRight } from '../../type_right/entities/type_right.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: ['pending', 'accepted', 'inProgress', 'canceled'] })
  status: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  suggested_price: string;

  @Column({ nullable: true })
  date_meeting: Date;

  @Column({
    nullable: true,
    comment: 'Предлагаемая дата консультации (указывает клиент)',
  })
  suggested_date_meeting: Date;

  @Column({ nullable: true })
  lawyerId: number;

  @Column({ nullable: true })
  active: boolean;

  @Column({ nullable: true })
  trouble_type: string;

  @Column({ nullable: true })
  additional_inf: string;

  @Column({ nullable: true })
  proposedLawyerId: number;

  @ManyToOne(() => TypeRight, (type_right) => type_right.request)
  @JoinColumn()
  type_right: TypeRight;

  @ManyToOne(() => User, (user) => user.request)
  @JoinColumn()
  user: User;
}
