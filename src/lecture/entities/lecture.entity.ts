import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum ItemUnit {
  SINGLE = 'single',
  MIXED = 'mixed',
}

export enum LectureState {
  ACTIVE = 'y',
  HIDDEN = 'n',
}

export enum FlagYN {
  YES = 'y',
  NO = 'n',
}

@Entity('lecture_info')
export class Lecture {
  @PrimaryGeneratedColumn({ name: 'lect_no', type: 'smallint', unsigned: true })
  lect_no: number;

  @Column({ name: 'lectcate_no', type: 'smallint', default: 0 })
  lectcate_no: number;

  @Column({ name: 'lect_name', length: 128 })
  lect_name: string;

  @Column({ name: 'teacher_no', type: 'smallint' })
  teacher_no: number;

  @Column({ name: 'lect_real_price', type: 'int', default: 0 })
  lect_real_price: number;

  @Column({ name: 'lect_price', type: 'int', default: 0 })
  lect_price: number;

  @Column({ name: 'lect_photo', length: 128 })
  lect_photo: string;

  @Column({ name: 'lect_short_intro', type: 'text' })
  lect_short_intro: string;

  @Column({ name: 'lect_introduce', type: 'text' })
  lect_introduce: string;

  @Column({ name: 'lect_days', type: 'smallint', default: 0 })
  lect_days: number;

  @Column({ name: 'book_code', type: 'int', unsigned: true })
  book_code: number;

  @Column({
    name: 'item_unit',
    type: 'enum',
    enum: ItemUnit,
    default: ItemUnit.SINGLE,
  })
  item_unit: ItemUnit;

  @Column({ name: 'item_codes', length: 32 })
  item_codes: string;

  @Column({
    name: 'mixed_view',
    type: 'enum',
    enum: FlagYN,
    default: FlagYN.NO,
  })
  mixed_view: FlagYN;

  @Column({
    name: 'lect_state',
    type: 'enum',
    enum: LectureState,
    default: LectureState.ACTIVE,
  })
  lect_state: LectureState;

  @Column({
    name: 'recommend_flag',
    type: 'enum',
    enum: FlagYN,
    default: FlagYN.NO,
  })
  recommend_flag: FlagYN;

  @Column({ name: 'sugang_main_no', type: 'int', default: 0 })
  sugang_main_no: number;

  @Column({ name: 'orderby', type: 'smallint', default: 0 })
  orderby: number;

  @CreateDateColumn({ name: 'reg_date', type: 'datetime' })
  reg_date: Date;

  @Column({ name: 'lect_intro_mov', length: 255 })
  lect_intro_mov: string;

  @Column({ name: 'lect_intro_img', length: 255 })
  lect_intro_img: string;

  @Column({ name: 'lect_intro_map', length: 255 })
  lect_intro_map: string;
}
