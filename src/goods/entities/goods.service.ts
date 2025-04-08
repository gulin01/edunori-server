import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('tbgd01')
export class Goods {
  @PrimaryGeneratedColumn({ unsigned: true })
  code: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  gd_subject: string;

  @Column({ type: 'varchar', length: 255 })
  summary_subject: string;

  @Index()
  @Column({ type: 'int', unsigned: true })
  pd_code: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  gd_price: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  cash_price: number;

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  multi_gd: 'y' | 'n';

  @Column({ type: 'int', unsigned: true, default: 0 })
  millage: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  stock: number;

  @Column({ type: 'char', length: 1 })
  delivery: string;

  @Column({ type: 'smallint', unsigned: true, default: 0 })
  order_grade: number;

  @Column({ type: 'char', length: 1 })
  pay_method: string;

  @Column({ type: 'int', width: 2, default: 0 })
  card_pay_install: number;

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  new_flag: 'y' | 'n';

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  cool_flag: 'y' | 'n';

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  recommend_flag: 'y' | 'n';

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  booking_flag: 'y' | 'n';

  @Index()
  @Column({ type: 'enum', enum: ['y', 'n', 's', 'm'], default: 'y' })
  state: 'y' | 'n' | 's' | 'm';

  @CreateDateColumn({ type: 'datetime' })
  regdate: Date;

  @Column({ type: 'varchar', length: 4095, nullable: true })
  memo?: string;

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  preview: 'y' | 'n';

  @Column({ type: 'int' })
  odrno: number;
}
