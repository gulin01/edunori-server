// interest-field.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'interest_fields' })
export class InterestField {
  @ApiProperty({
    description: 'Primary ID of the interest field',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User-friendly interest name',
    example: 'Elementary Math',
  })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    description: 'Category code from tbct01 table (external)',
    example: 12,
  })
  @Column({ name: 'category_code', unsigned: true })
  categoryCode: number;

  @ApiProperty({
    description: 'Category name (copied from tbct01.name)',
    example: 'Math - Grade 3',
  })
  @Column({ name: 'category_name', length: 64 })
  categoryName: string;

  @ApiProperty({ type: () => [User], readOnly: true })
  @ManyToMany(() => User, (user) => user.interests)
  users: User[];
}
