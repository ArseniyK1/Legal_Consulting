import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  value: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.roleId)
  public user: User[];
}
