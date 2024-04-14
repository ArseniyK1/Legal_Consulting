import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from '../../request/entities/request.entity';
@Entity({ name: 'type_right' })
export class TypeRight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => Request, (request) => request.type_right)
  request: Request;
}
