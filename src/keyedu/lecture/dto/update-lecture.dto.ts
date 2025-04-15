import { PartialType } from '@nestjs/mapped-types';
import { CreateLectureDto } from './create-lecture.dto';
import { IsInt } from 'class-validator';

export class UpdateLectureDto extends PartialType(CreateLectureDto) {
  @IsInt()
  lectNo: number; // Primary key ? required for updates
}
