import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieInfoEntity } from './entities/move.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieInfoEntity])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
