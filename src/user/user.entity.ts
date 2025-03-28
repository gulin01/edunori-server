import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('edunori_users') // Or 'edunori_users' if keeping the legacy name
export class User {
  @PrimaryGeneratedColumn('uuid') // or 'increment'
  uid: string; // Internal app ID or username

  @Column({ type: 'varchar', length: 20 })
  provider_name: string; // e.g., 'google', 'kakao', 'naver'

  @Column({ type: 'varchar', length: 100, unique: true })
  provider_id: string; // Unique user ID from provider

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'char', length: 8, nullable: true })
  birthday: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  mobile_phone: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  address1: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  address2: string | null;

  @Column({ type: 'varchar', length: 16, nullable: true })
  ip_v4: string | null;

  @Column({ type: 'varchar', length: 12, nullable: true })
  zipcode: string | null;

  @CreateDateColumn({ type: 'datetime' })
  join_date: Date;

  @UpdateDateColumn({ type: 'datetime' })
  last_login: Date;

  @Column({ type: 'int', unsigned: true, default: 0 })
  login_cnt: number;

  @Column({ type: 'datetime', nullable: true })
  leave_date: Date | null;

  @Column({ type: 'text', nullable: true })
  outmemo: string | null;

  @Column({ type: 'text', nullable: true })
  refresh_token: string | null;
}
