// dto/create-interest.dto.ts
import { IsString, MaxLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateInterestDto {
  @IsString()
  @MaxLength(50)
  name: string;
}

// entities/interest-field.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('interest_fields')
export class InterestField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => User, (user) => user.interests)
  users: User[];
}
