import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('path')
  getPaths() {
    return {
      moviePath: this.movieService.getMoviePath(),
      mobilePath: this.movieService.getMobilePath(),
    };
  }

  @Get('count')
  getCount(@Query('lect_no') lect_no?: number) {
    return this.movieService.getTotalCount(lect_no);
  }

  @Get()
  listMovies(@Query('page') page = 1, @Query('lect_no') lect_no?: number) {
    return this.movieService.listMovies(page, lect_no);
  }

  @Get(':movie_no')
  getMovie(@Param('movie_no') movie_no: number) {
    return this.movieService.getMovie(movie_no);
  }

  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.createMovie(dto);
  }

  @Put()
  update(@Body() dto: UpdateMovieDto) {
    return this.movieService.updateMovie(dto);
  }
}
