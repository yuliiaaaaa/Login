import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('deals')
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  picture: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  days_left: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  yield: number;

  @Column({ type: 'int' })
  sold_percentage: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  summ: number;
}
