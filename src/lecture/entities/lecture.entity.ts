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
  lectNo: number;

  @Column({ name: 'lectcate_no', type: 'smallint', default: 0 })
  lectcateNo: number;

  @Column({ name: 'lect_name', length: 128 })
  lectName: string;

  @Column({ name: 'teacher_no', type: 'smallint' })
  teacherNo: number;

  @Column({ name: 'lect_real_price', type: 'int', default: 0 })
  lectRealPrice: number;

  @Column({ name: 'lect_price', type: 'int', default: 0 })
  lectPrice: number;

  @Column({ name: 'lect_photo', length: 128 })
  lectPhoto: string;

  @Column({ name: 'lect_short_intro', type: 'text' })
  lectShortIntro: string;

  @Column({ name: 'lect_introduce', type: 'text' })
  lectIntroduce: string;

  @Column({ name: 'lect_days', type: 'smallint', default: 0 })
  lectDays: number;

  @Column({ name: 'book_code', type: 'int', unsigned: true })
  bookCode: number;

  @Column({
    name: 'item_unit',
    type: 'enum',
    enum: ItemUnit,
    default: ItemUnit.SINGLE,
  })
  itemUnit: ItemUnit;

  @Column({ name: 'item_codes', length: 32 })
  itemCodes: string;

  @Column({
    name: 'mixed_view',
    type: 'enum',
    enum: FlagYN,
    default: FlagYN.NO,
  })
  mixedView: FlagYN;

  @Column({
    name: 'lect_state',
    type: 'enum',
    enum: LectureState,
    default: LectureState.ACTIVE,
  })
  lectState: LectureState;

  @Column({
    name: 'recommend_flag',
    type: 'enum',
    enum: FlagYN,
    default: FlagYN.NO,
  })
  recommendFlag: FlagYN;

  @Column({ name: 'sugang_main_no', type: 'int', default: 0 })
  sugangMainNo: number;

  @Column({ name: 'orderby', type: 'smallint', default: 0 })
  orderby: number;

  @CreateDateColumn({ name: 'reg_date', type: 'datetime' })
  regDate: Date;

  @Column({ name: 'lect_intro_mov', length: 255 })
  lectIntroMov: string;

  @Column({ name: 'lect_intro_img', length: 255 })
  lectIntroImg: string;

  @Column({ name: 'lect_intro_map', length: 255 })
  lectIntroMap: string;
}
