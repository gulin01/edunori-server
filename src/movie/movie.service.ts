// movie.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { MovieInfo } from './entities/movie-info.entity';

import { MovieInfo } from './entities/move.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  private readonly pageSize = 20;
  private readonly moviePath = 'mms://wmsvod.englishbus.co.kr/englishbuswmv/';
  private readonly mobilePath = 'http://mvod.englishbus.co.kr/englishbusvod/';

  constructor(
    @InjectRepository(MovieInfo)
    private readonly movieRepo: Repository<MovieInfo>,
  ) {}

  getMoviePath(): string {
    return this.moviePath;
  }

  getMobilePath(): string {
    return this.mobilePath;
  }

  async getTotalCount(lect_no?: number): Promise<number> {
    const where = lect_no ? { lect_no } : {};
    return await this.movieRepo.count({ where });
  }

  async createMovie(dto: CreateMovieDto): Promise<MovieInfo> {
    const movie = this.movieRepo.create(dto);
    return this.movieRepo.save(movie);
  }

  async updateMovie(dto: any): Promise<MovieInfo> {
    await this.movieRepo.update(dto.movie_no, dto);
    return this.movieRepo.findOneBy({ movie_no: dto.movie_no });
  }

  async listMovies(cpage: number, lect_no?: number): Promise<MovieInfo[]> {
    const skip = (cpage - 1) * this.pageSize;
    const where = lect_no ? { lect_no } : {};

    return this.movieRepo.find({
      where,
      order: { movie_no: 'DESC' },
      skip,
      take: this.pageSize,
    });
  }

  async getMovie(movie_no: number): Promise<MovieInfo> {
    return this.movieRepo.findOneBy({ movie_no });
  }
}
