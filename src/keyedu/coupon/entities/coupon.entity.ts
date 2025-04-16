import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('coupon_main')
export class CouponMain {
  @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
  no: number;

  @Column({ type: 'varchar', length: 64 })
  coupon_name: string;

  @Column({ type: 'varchar', length: 255 })
  coupon_memo: string;

  @Index('keyword')
  @Column({ type: 'varchar', length: 10, nullable: true })
  coupon_keyword: string;

  @Column({ type: 'tinyint', default: 0 })
  discount_rate: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0 })
  discount_price: number;

  @Column({ type: 'mediumint', unsigned: true, default: 0 })
  apply_price: number;

  @Column({
    type: 'enum',
    enum: ['fixed', 'each'],
    default: 'fixed',
  })
  period_type: 'fixed' | 'each';

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  period_each_days: number;

  @Index()
  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({
    type: 'enum',
    enum: ['all', 'lecture', 'book', 'delivery'],
    default: 'lecture',
  })
  target_group: 'all' | 'lecture' | 'book' | 'delivery';

  @Column({ type: 'varchar', length: 32 })
  admin_id: string;

  @Column({ type: 'datetime' })
  reg_date: Date;
}
