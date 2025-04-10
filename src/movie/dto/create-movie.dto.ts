import { IsString, IsInt, IsOptional, IsEnum, IsDate } from 'class-validator';
import { MovieState } from '../entities/move.entity';

export class CreateMovieDto {
  @IsInt()
  lect_no: number;

  @IsString()
  @IsOptional()
  movie_listno?: string; // default: '1'

  @IsString()
  movie_title: string;

  @IsString()
  movie_url: string;

  @IsString()
  movie_url2: string;

  @IsString()
  movie_url3: string;

  @IsString()
  movie_url4: string;

  @IsString()
  movie_url5: string;

  @IsString()
  movie_url6: string;

  @IsString()
  movie_url7: string;

  @IsString()
  movie_url8: string;

  @IsString()
  @IsOptional()
  movie_url_new1?: string; // nullable

  @IsString()
  movie_url_new2: string;

  @IsString()
  kollus: string;

  @IsInt()
  @IsOptional()
  movie_time?: number; // default: 0

  @IsString()
  upfile_orgname: string;

  @IsString()
  upfile_newname: string;

  @IsEnum(MovieState)
  @IsOptional()
  movie_state?: MovieState; // default: MovieState.PAY

  @IsDate()
  reg_date: Date;
}
