import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'feedback', createdAt: false, updatedAt: false })
export class Feedback extends Model<Feedback> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER })
  rating: number;

  @Column({ type: DataType.STRING })
  description: string;
}
