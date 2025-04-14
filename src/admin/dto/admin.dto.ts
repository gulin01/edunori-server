import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'The unique email address of the admin user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'The password for the admin user (will be hashed)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Jane Admin',
    description: 'Full name of the admin user',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'admin',
    description: 'Role of the admin user (admin or super_admin)',
    enum: ['admin', 'super_admin'],
    required: false,
    default: 'admin',
  })
  @IsOptional()
  @IsIn(['admin', 'super_admin'])
  role?: 'admin' | 'super_admin';
}
