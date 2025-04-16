import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tbct01' })
export class KeyEduCategory {
  @ApiProperty({
    description: 'Primary key for the category',
    example: 12,
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  code: number;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Elementary English - Grade 3',
  })
  @Column({ length: 64 })
  name: string;

  @ApiProperty({
    description: 'Left value used for nested set (tree) structure',
    example: 5,
  })
  @Column()
  lft: number;

  @ApiProperty({
    description: 'Right value used for nested set (tree) structure',
    example: 10,
  })
  @Column()
  rgt: number;

  @ApiProperty({
    description: 'Optional description or metadata about the category',
    required: false,
    example: 'This category includes all English books for Grade 3.',
  })
  @Column({ length: 2048, nullable: true })
  content?: string;

  @ApiProperty({
    description: 'State of the category (y = active, n = inactive)',
    enum: ['y', 'n'],
    example: 'y',
    default: 'y',
  })
  @Column({ type: 'enum', enum: ['y', 'n'], default: 'y' })
  state: 'y' | 'n';
}
