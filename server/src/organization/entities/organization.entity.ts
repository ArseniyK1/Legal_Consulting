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
import { Request } from '../../request/entities/request.entity';

@Entity({ name: 'organization' })
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  short_name: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  inn: string;

  @Column({ type: 'varchar', nullable: true })
  contacts: string;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @OneToMany(() => User, (user) => user.organization)
  user: User[];
}
