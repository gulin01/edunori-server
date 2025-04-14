// entities/interest-field.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('interest_fields')
export class InterestField {
  @ApiProperty({ example: 1, description: 'Unique ID of the interest field' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Machine Learning',
    description: 'Name of the interest field',
  })
  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => User, (user) => user.interests)
  users: User[];
}
