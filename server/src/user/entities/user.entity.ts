import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Roles } from '../../roles/entities/roles.entity';
import { UserRoles } from './UserRoles.entity';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';
import { Discount } from '../../discount/entities/discount.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { UserRequest } from './UserRequest.entity';
import { Request } from '../../request/entities/request.entity';

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

  @HasMany(() => Portfolio, 'userId')
  portfolio: Portfolio[];

  @HasMany(() => Discount, 'userId')
  discount: Discount[];

  @HasMany(() => Feedback, 'userId')
  feedback: Feedback[];

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];

  @BelongsToMany(() => Request, () => UserRequest)
  request: Request[];
}
