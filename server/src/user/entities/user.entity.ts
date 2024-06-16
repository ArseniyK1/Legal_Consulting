import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discount } from '../../discount/entities/discount.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { Request } from '../../request/entities/request.entity';
import { Roles } from '../../roles/entities/roles.entity';
import { Organization } from '../../organization/entities/organization.entity';
import { Case } from '../../case/entities/case.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column({ nullable: true })
  login: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phonenumber: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  contact_email: string;

  @Column({ default: null, type: 'jsonb' })
  type_law: JSON;

  @ManyToOne(() => Organization, (organization) => organization.user)
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  @OneToMany(() => Discount, (discount) => discount.user)
  discount: Discount[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedback: Feedback[];

  @OneToMany(() => Request, (request) => request.user)
  request: Request[];

  @OneToMany(() => Case, (caseEntity) => caseEntity.user)
  case: Case[];

  @ManyToOne(() => Roles, (roles) => roles.user)
  @JoinColumn({ name: 'roleId' })
  public roleId: Roles;
}
