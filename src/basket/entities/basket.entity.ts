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
   * ����� ID or guest UUID
   */
  @Index()
  @Column({ type: 'varchar', length: 100 })
  user_id: string;

  /**
   * ��ǰ �ڵ� (book, lecture ��)
   */
  @Index()
  @Column({ type: 'int', unsigned: true })
  gd_code: number;

  /**
   * ��ǰ ����: book �Ǵ� lecture
   */
  @Column({
    type: 'enum',
    enum: ['book', 'lecture'],
    default: 'book',
  })
  gd_type: 'book' | 'lecture';

  /**
   * ��ٱ��� ����
   */
  @Column({ type: 'int', unsigned: true, default: 1 })
  quantity: number;

  /**
   * ��ٱ��Ͽ� ���� �ð�
   */
  @CreateDateColumn({ type: 'datetime' })
  reg_date: Date;
}
