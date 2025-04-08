import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('tbod02')
export class OrderGoodsEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  code: number;

  @Index()
  @Column({ type: 'varchar', length: 32 })
  order_code: string;

  @Column({
    type: 'enum',
    enum: ['book', 'lecture'],
    default: 'book',
  })
  gd_type: 'book' | 'lecture';

  @Index()
  @Column({ type: 'int', unsigned: true })
  gd_code: number;

  @Column({ type: 'int', unsigned: true })
  quantity: number;

  @Column({ type: 'int', unsigned: true })
  price: number;

  @Column({ type: 'int', unsigned: true })
  final_price: number;

  @Column({ type: 'smallint', default: 0 })
  lect_days: number;

  @Column({ type: 'varchar', length: 32, nullable: true })
  use_coupon_number: string;

  /**
   * Relation to tbod01 (OrderEntity)
   */
  @ManyToOne(() => OrderEntity, (order: any) => order.goods, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_code', referencedColumnName: 'order_code' })
  order: OrderEntity;
}
