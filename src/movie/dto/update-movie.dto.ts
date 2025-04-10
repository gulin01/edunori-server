import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsInt } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsInt()
  movie_no: number;
}
