import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { UserRoles } from '../../user/entities/UserRoles.entity';
// import { Roles } from '../../roles/entities/roles.entity';
// import { UserRoles } from '../../intermediateModels/UserRoles.entity';

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Roles extends Model<Roles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  //
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'USER' })
  value: string;

  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
