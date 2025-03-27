import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbmb01')
export class kUser {
  @PrimaryGeneratedColumn({ unsigned: true })
  code: number;

  @Column({ type: 'char', length: 100, unique: true })
  id: string;

  @Column({ type: 'char', length: 32 })
  password: string;

  @Column({ type: 'varchar', length: 8, default: '' })
  id_provider: string;

  @Column({ type: 'varchar', length: 16, default: '' })
  kakao_no: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  access_token: string;

  @Column({ type: 'char', length: 20, nullable: true })
  name: string | null;

  @Column({ type: 'char', length: 32 })
  email: string;

  @Column({ type: 'char', length: 32 })
  sid: string;

  @Column({ type: 'char', length: 8 })
  birthday: string;

  @Column({ type: 'char', length: 20 })
  phone: string;

  @Column({ type: 'char', length: 20 })
  mobile_phone: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  mb_pa_name: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  mb_pa_hp: string;

  @Column({ type: 'char', length: 64 })
  address1: string;

  @Column({ type: 'char', length: 64 })
  address2: string;

  @Column({ type: 'char', length: 16 })
  ip_v4: string;

  @Column({ type: 'char', length: 12 })
  zipcode: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  zipcode_new: string | null;

  @Column({ type: 'varchar', length: 128 })
  inst_name: string;

  @Column({ type: 'varchar', length: 128 })
  affiliate: string;

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'n' })
  affcheck: 'y' | 'n';

  @Column({ type: 'varchar', length: 16, nullable: true })
  business_number: string | null;

  @Column({ type: 'smallint', unsigned: true, default: 1 })
  grade: number;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  memo: string | null;

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'y' })
  send_message: 'y' | 'n';

  @Column({ type: 'datetime' })
  join_date: Date;

  @Column({ type: 'datetime' })
  last_login: Date;

  @Column({ type: 'int', unsigned: true, default: 0 })
  login_cnt: number;

  @Column({ type: 'enum', enum: ['y', 'n'], default: 'y' })
  state: 'y' | 'n';

  @Column({ type: 'datetime' })
  leave_date: Date;

  @Column({ type: 'text' })
  outmemo: string;

  @Column({ type: 'varchar', length: 5 })
  mchk: string;

  @Column({ type: 'varchar', length: 5 })
  schk: string;

  @Column({ type: 'varchar', length: 5 })
  murl01: string;

  @Column({ type: 'varchar', length: 5 })
  murl02: string;

  @Column({ type: 'char', length: 1, nullable: true })
  mjoin: string | null;

  @Column({ type: 'char', length: 1, nullable: true })
  dormant_user: string | null;

  @Column({ type: 'enum', enum: ['0', '1'], default: '0' })
  united: '0' | '1';

  @Column({ type: 'varchar', length: 100, default: '' })
  united_id: string;
}
