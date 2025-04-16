import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('coupon_goods')
export class CouponGoods {
  @PrimaryGeneratedColumn()
  no: number;

  @Index()
  @Column({ type: 'smallint', unsigned: true, default: 0 })
  coupon_main_no: number;

  @Column({
    type: 'enum',
    enum: ['book', 'lecture'],
    default: 'book',
  })
  gd_type: 'book' | 'lecture';

  @Column({ type: 'int', unsigned: true, default: 0 })
  code: number;
}
