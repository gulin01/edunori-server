import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum BannerPosition {
  main = 'main',
  recommend = 'recommend',
  mainR = 'mainR',
  mainL = 'mainL',
  mainT = 'mainT',
  ksT = 'ksT',
  keyT = 'keyT',
  mainP = 'mainP',
  teachRes = 'teachRes',
  attend = 'attend',
  bestseller = 'bestseller',
}

export enum LinkTarget {
  self = 'self',
  blank = 'blank',
  map = 'map',
}

export enum PeriodType {
  none = 'none',
  date = 'date',
}

export enum StateType {
  Y = 'Y',
  N = 'N',
}

export enum LinkCommon {
  Y = 'Y',
  N = 'N',
}

@Entity({ name: 'banner_info' })
export class BannerInfo {
  @ApiProperty({ description: '배너 고유 번호' })
  @PrimaryGeneratedColumn({ name: 'banner_no', type: 'smallint' })
  banner_no: number;

  @ApiProperty({ description: '배너 이름' })
  @Column({ name: 'banner_name', type: 'varchar', length: 128 })
  banner_name: string;

  @ApiProperty({ enum: BannerPosition, description: '배너 위치' })
  @Column({ type: 'enum', enum: BannerPosition })
  position: BannerPosition;

  @ApiProperty({ description: 'PC용 배너 이미지 경로' })
  @Column({ name: 'banner_img', type: 'varchar', length: 255 })
  banner_img: string;

  @ApiProperty({ enum: LinkTarget, description: 'PC 링크 타겟' })
  @Column({ name: 'link_target', type: 'enum', enum: LinkTarget })
  link_target: LinkTarget;

  @ApiProperty({ description: 'PC용 링크 정보' })
  @Column({ name: 'link_info', type: 'text' })
  link_info: string;

  @ApiProperty({ enum: PeriodType, description: '노출 기간 타입' })
  @Column({ type: 'enum', enum: PeriodType })
  period: PeriodType;

  @ApiProperty({ description: '노출 시작일' })
  @Column({ name: 'start_date', type: 'date' })
  start_date: string;

  @ApiProperty({ description: '노출 종료일' })
  @Column({ name: 'end_date', type: 'date' })
  end_date: string;

  @ApiProperty({ description: '정렬 순서' })
  @Column({ name: 'ordno', type: 'smallint', default: 0 })
  ordno: number;

  @ApiProperty({ enum: StateType, description: '노출 여부' })
  @Column({ type: 'enum', enum: StateType, default: StateType.Y })
  state: StateType;

  @ApiProperty({ description: '등록일' })
  @Column({ name: 'reg_date', type: 'datetime' })
  reg_date: Date;

  @ApiProperty({ description: '배경 색상' })
  @Column({
    name: 'back_color',
    type: 'varchar',
    length: 255,
    default: '#ffffff',
  })
  back_color: string;

  @ApiProperty({ description: '모바일용 배너 이미지 경로' })
  @Column({ name: 'banner_img_m', type: 'varchar', length: 255 })
  banner_img_m: string;

  @ApiProperty({ enum: LinkCommon, description: 'PC/모바일 공통 링크 여부' })
  @Column({
    name: 'link_common',
    type: 'enum',
    enum: LinkCommon,
    default: LinkCommon.N,
  })
  link_common: LinkCommon;

  @ApiProperty({ enum: LinkTarget, description: '모바일 링크 타겟' })
  @Column({
    name: 'link_target_m',
    type: 'enum',
    enum: LinkTarget,
    default: LinkTarget.self,
  })
  link_target_m: LinkTarget;

  @ApiProperty({ description: '모바일용 링크 정보' })
  @Column({ name: 'link_info_m', type: 'text' })
  link_info_m: string;

  @ApiProperty({ description: '이벤트 코드' })
  @Column({ name: 'event_code', type: 'varchar', length: 10 })
  event_code: string;
}
