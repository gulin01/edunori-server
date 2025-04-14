import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInterestDto {
  @ApiProperty({
    example: 'AI & Robotics',
    description: 'Name of the interest field',
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  name: string;
}
