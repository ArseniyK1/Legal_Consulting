import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Feedback } from '../../feedback/entities/feedback.entity';

@Table({ tableName: 'decision', createdAt: false, updatedAt: false })
export class Decision extends Model<Decision> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  cost: string;

  @Column({ type: DataType.BOOLEAN })
  selected: boolean;

  @HasMany(() => Feedback, 'decisionId')
  feedback: Feedback[];
}
