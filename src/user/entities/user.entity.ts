import { InterestField } from 'src/interest/entities/interest-field.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ type: 'varchar', length: 20 })
  provider_name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  provider_id: string;

  @Column({ type: 'varchar', length: 255, charset: 'utf8mb4' })
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

  @ManyToMany(() => InterestField, (interest) => interest.users)
  @JoinTable({
    name: 'user_interest',
    joinColumn: { name: 'user_id', referencedColumnName: 'uid' },
    inverseJoinColumn: { name: 'interest_id', referencedColumnName: 'id' },
  })
  interests: InterestField[];
}
