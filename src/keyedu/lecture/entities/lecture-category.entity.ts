import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lecture_category')
export class LectureCategory {
  @PrimaryGeneratedColumn()
  lectcate_no: number;

  @Column()
  lectcate_name: string;

  @Column({ default: 1 })
  order_by: number;

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'y' })
  status: 'y' | 'n';
}
