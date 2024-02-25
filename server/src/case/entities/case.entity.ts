import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'case', createdAt: false, updatedAt: false })
export class Case extends Model<Case> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.BOOLEAN })
  success: boolean;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  article: string;
}
