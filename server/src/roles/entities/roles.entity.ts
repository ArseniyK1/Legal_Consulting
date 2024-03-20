import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Roles extends Model<Roles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'USER' })
  value: string;

  @Column({ type: DataType.STRING })
  description: string;

  @HasMany(() => User, 'roleId')
  roleId: User[];
}
