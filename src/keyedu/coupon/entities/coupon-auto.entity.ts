import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('coupon_auto_config')
export class CouponAuto {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  no: number;

  @Column({ type: 'smallint', unsigned: true, default: 0 })
  coupon_main_no: number;

  @Index()
  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({
    type: 'enum',
    enum: ['Y', 'N'],
    default: 'Y',
  })
  state: 'Y' | 'N';

  @Column({ type: 'varchar', length: 255 })
  memo: string;

  @Index()
  @Column({ type: 'datetime' })
  reg_date: Date;
}
