// dto/create-teacher.dto.ts
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  teacher_name: string;

  @IsString()
  @IsNotEmpty()
  teacher_career: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  teacher_photo: string;
}
