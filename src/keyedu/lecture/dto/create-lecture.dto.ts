import { IsString, IsInt, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ItemUnit, LectureState, FlagYN } from '../entities/lecture.entity';

export class CreateLectureDto {
  @IsString()
  lect_name: string;

  @IsOptional()
  @IsInt()
  lectcate_no?: number;

  @IsInt()
  teacher_no: number;

  @IsInt()
  lect_real_price: number;

  @IsInt()
  lect_price: number;

  @IsString()
  lect_photo: string;

  @IsString()
  lect_short_intro: string;

  @IsString()
  lect_introduce: string;

  @IsInt()
  lect_days: number;

  @IsInt()
  book_code: number;

  @IsEnum(ItemUnit)
  item_unit: ItemUnit;

  @IsString()
  item_codes: string;

  @IsEnum(FlagYN)
  @IsOptional()
  mixed_view?: FlagYN;

  @IsEnum(LectureState)
  @IsOptional()
  lect_state?: LectureState;

  @IsEnum(FlagYN)
  @IsOptional()
  recommend_flag?: FlagYN;

  @IsInt()
  @IsOptional()
  sugang_main_no?: number;

  @IsInt()
  @IsOptional()
  orderby?: number;

  @IsString()
  lect_intro_mov: string;

  @IsString()
  lect_intro_img: string;

  @IsString()
  lect_intro_map: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  item_no?: number[]; // ? this is required for bundled (mixed) lecture updates
}
