import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('tbpd01')
export class ProductEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  code: number;

  @Index()
  @Column({ type: 'int', unsigned: true })
  category: number;

  @Index()
  @Column({ type: 'int', unsigned: true })
  brand: number;

  @Index()
  @Column({ type: 'char', length: 64 })
  pd_name: string;

  @Index()
  @Column({ type: 'int', unsigned: true })
  pd_price: number;

  @Index()
  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  bundle: 'y' | 'n';

  @Index()
  @Column({ type: 'enum', enum: ['y', 'n', 'm'], default: 'y', nullable: true })
  state?: 'y' | 'n' | 'm';

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  teacher_item: 'y' | 'n';

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'y' })
  image: 'y' | 'n';

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  sub_image: 'y' | 'n';

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  mobile_image: 'y' | 'n';

  @Column({ type: 'int', unsigned: true, default: 0 })
  hit: number;

  @Column({ type: 'smallint', unsigned: true, default: 0 })
  lect_no: number;

  @Column({ type: 'int', default: 0 })
  sugang_main_no: number;

  @Column({ type: 'varchar', length: 64, default: '' })
  slink: string;

  @Column({ type: 'tinyint', width: 3, default: 1 })
  item_qty: number;

  @Column({ type: 'date', nullable: true })
  regdate?: string;
}
