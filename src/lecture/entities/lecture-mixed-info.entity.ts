import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lecture_mixed_info')
export class LectureMixedInfo {
  @PrimaryGeneratedColumn({ name: 'lect_mixed_no', type: 'smallint' })
  lectMixedNo: number;

  @Column({ name: 'ref_no', type: 'smallint', default: 0 })
  refNo: number;

  @Column({ name: 'lect_no', type: 'smallint', unsigned: true, default: 0 })
  lectNo: number;

  // Optional: Setup relations later when Lecture entity is fully migrated
  // @ManyToOne(() => Lecture)
  // @JoinColumn({ name: 'lect_no' })
  // lecture: Lecture;

  // @ManyToOne(() => Lecture)
  // @JoinColumn({ name: 'ref_no' })
  // parentLecture: Lecture;
}
