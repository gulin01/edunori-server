// --- interest-field.entity.ts ---
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'interest_fields' })
export class InterestField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ name: 'category_code', unsigned: true })
  categoryCode: number;

  @Column({ name: 'category_name', length: 64 })
  categoryName: string;

  @ManyToMany(() => User, (user) => user.interests)
  users: User[];
}
