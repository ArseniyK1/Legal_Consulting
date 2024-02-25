import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Case } from '../../case/entities/case.entity';

@Table({ tableName: 'portfolio', createdAt: false, updatedAt: false })
export class Portfolio extends Model<Portfolio> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  education: string;

  @Column({ type: DataType.INTEGER })
  length_of_service: number;

  @Column({ type: DataType.STRING })
  retraining: string;

  @HasMany(() => Case, 'portfolioId')
  case: Case[];
}
