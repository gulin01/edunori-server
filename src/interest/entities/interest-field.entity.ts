// entities/interest-field.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('interest_fields')
export class InterestField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => User, (user) => user.interests)
  users: User[];
}
