import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lecture } from './lecture.entity';

@Entity('lecture_mixed_info')
export class LectureMixedInfo {
  @PrimaryGeneratedColumn({ name: 'lect_mixed_no', type: 'smallint' })
  lect_mixed_no: number;

  @Column({ name: 'ref_no', type: 'smallint', default: 0 })
  ref_no: number;

  @Column({ name: 'lect_no', type: 'smallint', unsigned: true, default: 0 })
  lect_no: number;

  @ManyToOne(() => Lecture)
  @JoinColumn({ name: 'lect_no' }) // This should match the FK column in DB
  parent_lecture: Lecture; // ? This makes lecture.lect_name etc. accessible

  // Optional: Setup relations later when Lecture entity is fully migrated
  // @ManyToOne(() => Lecture)
  // @JoinColumn({ name: 'lect_no' })
  // lecture: Lecture;

  // @ManyToOne(() => Lecture)
  // @JoinColumn({ name: 'ref_no' })
  // parentLecture: Lecture;
}
