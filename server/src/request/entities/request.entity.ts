import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { Trouble } from '../../trouble/entities/trouble.entity';

@Table({ tableName: 'request', createdAt: false, updatedAt: false })
export class Request extends Model<Request> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.INTEGER })
  lawyerId: number;

  @HasMany(() => Trouble, 'requestId')
  trouble: Trouble[];
}
