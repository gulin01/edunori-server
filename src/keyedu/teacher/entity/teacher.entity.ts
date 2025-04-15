// entities/teacher-info.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('teacher_info')
export class TeacherInfo {
  @PrimaryGeneratedColumn()
  teacher_no: number;

  @Column({ type: 'varchar', length: 32 })
  teacher_name: string;

  @Column({ type: 'text' })
  teacher_career: string;

  @Column({ type: 'varchar', length: 128 })
  teacher_photo: string;

  @Column({ type: 'datetime' })
  reg_date: Date;
}
