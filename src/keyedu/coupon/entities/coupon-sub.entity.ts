import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

@Entity('coupon_sub')
export class CouponSub {
  @PrimaryColumn({ type: 'char', length: 20 })
  coupon_no: string;

  @Index()
  @Column({ type: 'smallint', unsigned: true, default: 0 })
  coupon_main_no: number;

  @Column({ type: 'date' })
  sub_start_date: string;

  @Column({ type: 'date' })
  sub_end_date: string;

  @Column({ type: 'varchar', length: 100 })
  user_id: string;

  @Column({ type: 'datetime' })
  use_date: Date;

  @Column({ type: 'varchar', length: 32 })
  order_code: string;

  @Column({ type: 'varchar', length: 255 })
  etc: string;

  @Index()
  @Column({ type: 'datetime' })
  reg_date: Date;
}
