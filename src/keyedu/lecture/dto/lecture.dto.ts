import { IsIn, IsNotEmpty, IsArray } from 'class-validator';

export class CreateLectureCategoryDto {
  @IsNotEmpty()
  lectcate_name: string;

  @IsIn(['y', 'n'])
  status: 'y' | 'n';
}

export class ReorderLectureCategoryDto {
  @IsArray()
  arr_code: number[];
}
