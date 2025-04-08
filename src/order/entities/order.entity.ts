import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { OrderGoodsEntity } from './order-good.entity';

@Entity('tbod01')
export class OrderEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  code: number;

  @Index()
  @Column({ type: 'varchar', length: 32, nullable: true })
  order_code: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  order_goods_name: string;

  @Index()
  @Column({ type: 'varchar', length: 100, default: '' })
  id: string;

  @Column({ type: 'char', length: 16 })
  name: string;

  @Column({ type: 'char', length: 32 })
  email: string;

  @Index()
  @Column({ type: 'char', length: 20 })
  phone: string;

  @Index()
  @Column({ type: 'char', length: 20 })
  mobile_phone: string;

  @Column({ type: 'char', length: 64 })
  address1: string;

  @Column({ type: 'char', length: 64 })
  address2: string;

  @Column({ type: 'char', length: 16 })
  ip_v4: string;

  @Column({ type: 'char', length: 12 })
  zipcode: string;

  @Index()
  @Column({ type: 'varchar', length: 2 })
  state: string;

  @Column({ type: 'int', unsigned: true })
  total_price: number;

  @Column({ type: 'varchar', length: 2 })
  order_method: string;

  @Index()
  @Column({ type: 'datetime' })
  order_date: Date;

  @Index()
  @Column({ type: 'datetime' })
  result_date: Date;

  @Column({ type: 'int', width: 2, default: 0 })
  card_pay_install: number;

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  send_sms: 'y' | 'n';

  @Column({ type: 'varchar', length: 2048, nullable: true })
  order_message: string;

  @Column({
    type: 'enum',
    enum: [
      'bank',
      'online',
      'Card',
      'VCard',
      'DirectBank',
      'HPP',
      '100000000000',
      '010000000000',
      '001000000000',
      '000100000000',
      '000010000000',
      '000000001000',
      'escrow',
      'SMS',
      'easyPay',
      'etc',
    ],
    default: 'bank',
  })
  payment_method: string;

  @Column({ type: 'varchar', length: 100 })
  payment_info: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  trade_number: string;

  @Column({ type: 'tinytext' })
  result_msg: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  invoice_number: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  order_name: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  delivery: number;

  @Column({ type: 'char', length: 20 })
  coupon_no: string;

  @Column({ type: 'mediumint', unsigned: true, default: 0 })
  coupon_discount: number;

  @Column({ type: 'enum', enum: ['', 'phone_no', 'business_no'] })
  cash_receipt_md: '' | 'phone_no' | 'business_no';

  @Column({ type: 'varchar', length: 15 })
  cash_receipt_no: string;

  @Column({ type: 'varchar', length: 64 })
  cash_receipt_name: string;

  @Column({ type: 'char', length: 1, nullable: true })
  morder: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  receipt_url: string;

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  orderlink_yn: 'y' | 'n';

  @Column({ type: 'varchar', length: 255, default: '' })
  event_memo: string;

  @OneToMany(() => OrderGoodsEntity, (goods) => goods.order, { cascade: true })
  goods: OrderGoodsEntity[];
}
