import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Roles } from '../../roles/entities/roles.entity';
import { User } from './user.entity';
import { Request } from '../../request/entities/request.entity';

@Table({ tableName: 'user_request', createdAt: false, updatedAt: false })
export class UserRequest extends Model<UserRequest> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Request)
  @Column({ type: DataType.INTEGER })
  requestId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
