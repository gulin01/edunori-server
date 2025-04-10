// movie.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { MovieInfo } from './entities/movie-info.entity';

import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieInfoEntity } from './entities/move.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  private readonly pageSize = 20;
  private readonly moviePath = 'mms://wmsvod.englishbus.co.kr/englishbuswmv/';
  private readonly mobilePath = 'http://mvod.englishbus.co.kr/englishbusvod/';

  constructor(
    @InjectRepository(MovieInfoEntity)
    private readonly movieRepo: Repository<MovieInfoEntity>,
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

  async createMovie(dto: CreateMovieDto): Promise<MovieInfoEntity> {
    const movie = this.movieRepo.create(dto);
    return this.movieRepo.save(movie);
  }

  async updateMovie(dto: UpdateMovieDto): Promise<MovieInfoEntity> {
    await this.movieRepo.update(dto.movie_no, dto);
    const movie = await this.movieRepo.findOneBy({ movie_no: dto.movie_no });
    if (!movie) throw new NotFoundException('해당 동영상을 찾을 수 없습니다.');
    return movie;
  }

  async listMovies(
    cpage: number,
    lect_no?: number,
  ): Promise<MovieInfoEntity[]> {
    const skip = (cpage - 1) * this.pageSize;
    const where = lect_no ? { lect_no } : {};

    return this.movieRepo.find({
      where,
      order: { movie_no: 'DESC' },
      skip,
      take: this.pageSize,
    });
  }

  async getMovie(movie_no: number): Promise<MovieInfoEntity> {
    const movie = await this.movieRepo.findOneBy({ movie_no });
    if (!movie) throw new NotFoundException('해당 동영상을 찾을 수 없습니다.');
    return movie;
  }
}
