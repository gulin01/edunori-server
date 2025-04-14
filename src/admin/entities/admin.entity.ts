import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('admin_users')
export class AdminUser {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'admin@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashed-password' })
  @Column()
  password: string;

  @ApiProperty({ example: 'Admin Name' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: 'super_admin' })
  @Column({ default: 'admin' })
  role: 'admin' | 'super_admin';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
