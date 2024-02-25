import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'discount', createdAt: false, updatedAt: false })
export class Discount extends Model<Discount> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.INTEGER })
  discount_percentage: number;
}
