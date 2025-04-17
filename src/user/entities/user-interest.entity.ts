// src/user/entities/user-interest.entity.ts
import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_interest' })
export class UserInterest {
  @PrimaryColumn({ name: 'user_id', type: 'varchar', length: 36 })
  userId: string;

  @PrimaryColumn({ name: 'interest_id', type: 'int' })
  interestId: number;

  @ManyToOne(() => User, (user) => user.interests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'uid' })
  user: User;

  @OneToMany(() => UserInterest, (ui) => ui.user)
  userInterests: UserInterest[];
}
