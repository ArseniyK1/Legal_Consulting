import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../roles/entities/roles.entity';
import { UserRoles } from './UserRoles.entity';
// import { Role } from '../../roles/entities/roles.entity';
// import { UserRoles } from '../../intermediateModels/UserRoles.entity';

interface UserCreationAttrs {
  first_name: string;
  second_name: string;
  middle_name: string;
  login: string;
  phonenumber: string;
  photo: string;
  date_of_birth: Date;
  contact_email: string;
  password: string;
}

@Table({ tableName: 'user', createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  second_name: string;

  @Column({ type: DataType.STRING })
  middle_name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, unique: true })
  phonenumber: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified: boolean;

  @Column({ type: DataType.STRING })
  photo: string;

  @Column({ type: DataType.DATE })
  date_of_birth: Date;

  @Column({ type: DataType.STRING, unique: true })
  contact_email: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];
}
