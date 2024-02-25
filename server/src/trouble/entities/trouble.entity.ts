import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Decision } from '../../decision/entities/decision.entity';

@Table({ tableName: 'trouble', createdAt: false, updatedAt: false })
export class Trouble extends Model<Trouble> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  suggested_price: string;

  @Column({ type: DataType.STRING })
  type: string;

  @HasMany(() => Decision, 'troubleId')
  decision: Decision[];
}
