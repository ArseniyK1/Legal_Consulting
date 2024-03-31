import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';
import { Discount } from '../../discount/entities/discount.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { Request } from '../../request/entities/request.entity';
import { Roles } from '../../roles/entities/roles.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ type: 'varchar', nullable: true })
  last_name: string;

  @Column({ type: 'varchar', nullable: true })
  middle_name: string;

  @Column({ type: 'varchar', nullable: true, default: 'asd' })
  login: string;

  @Column({ type: 'varchar', nullable: true, default: 'asd' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  phonenumber: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', nullable: true })
  contact_email: string;

  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolio: Portfolio[];

  @OneToMany(() => Discount, (discount) => discount.user)
  discount: Discount[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedback: Feedback[];

  @OneToMany(() => Request, (request) => request.user)
  request: Request[];

  @ManyToOne(() => Roles, (roles) => roles.user)
  @JoinColumn({ name: 'roleId' })
  public roleId: Roles;
}
