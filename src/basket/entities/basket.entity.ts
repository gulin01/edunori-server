import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity('tbbs01') // adjust if your table name changes
export class BasketEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  code: number;

  /**
   * 사용자 ID or guest UUID
   */
  @Index()
  @Column({ type: 'varchar', length: 100 })
  user_id: string;

  /**
   * 상품 코드 (book, lecture 등)
   */
  @Index()
  @Column({ type: 'int', unsigned: true })
  gd_code: number;

  /**
   * 상품 종류: book 또는 lecture
   */
  @Column({
    type: 'enum',
    enum: ['book', 'lecture'],
    default: 'book',
  })
  gd_type: 'book' | 'lecture';

  /**
   * 장바구니 수량
   */
  @Column({ type: 'int', unsigned: true, default: 1 })
  quantity: number;

  /**
   * 장바구니에 담은 시각
   */
  @CreateDateColumn({ type: 'datetime' })
  reg_date: Date;
}
