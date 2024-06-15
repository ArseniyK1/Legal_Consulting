import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  success: boolean;

  @Column()
  description: string;

  @Column()
  article: string;
}
