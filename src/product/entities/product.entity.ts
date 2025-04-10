import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Goods } from 'src/goods/entities/goods.entity';

export enum ProductState {
  Y = 'y', // Active
  N = 'n', // Inactive
  M = 'm', // Maintenance or other special case
}

export enum YnFlag {
  YES = 'y',
  NO = 'n',
}

@Entity('tbpd01')
export class ProductEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  code: number;

  @Column({ type: 'int', unsigned: true })
  category: number;

  @Column({ type: 'int', unsigned: true })
  brand: number;

  @Column({ type: 'char', length: 64 })
  pd_name: string;

  @Column({ type: 'int', unsigned: true })
  pd_price: number;

  @Column({
    type: 'enum',
    enum: YnFlag,
    default: YnFlag.NO,
  })
  bundle: YnFlag;

  @Column({
    type: 'enum',
    enum: ProductState,
    default: ProductState.Y,
  })
  state: ProductState;

  @Column({
    type: 'enum',
    enum: YnFlag,
    default: YnFlag.NO,
  })
  teacher_item: YnFlag;

  @Column({
    type: 'enum',
    enum: YnFlag,
    default: YnFlag.YES,
  })
  image: YnFlag;

  @Column({
    type: 'enum',
    enum: YnFlag,
    default: YnFlag.NO,
  })
  sub_image: YnFlag;

  @Column({
    type: 'enum',
    enum: YnFlag,
    default: YnFlag.NO,
  })
  mobile_image: YnFlag;

  @Column({ type: 'int', unsigned: true, default: 0 })
  hit: number;

  @Column({ type: 'smallint', unsigned: true, default: 0 })
  lect_no: number;

  @Column({ type: 'int', default: 0 })
  sugang_main_no: number;

  @Column({ type: 'varchar', length: 64, default: '' })
  slink: string;

  @Column({ type: 'tinyint', default: 1 })
  item_qty: number;

  @Column({ type: 'date', nullable: true })
  regdate: Date;

  @OneToMany(() => Goods, (goods) => goods.product, { cascade: true })
  goods: Goods[];
}
