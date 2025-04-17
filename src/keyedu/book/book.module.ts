import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookService } from './book.service';
import { BookRoadmapSeries } from './entities/book-roadmap-series..entity';
import { BookController } from './book.controller';
import { BannerInfo } from './entities/banner-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [BookRoadmapSeries, BannerInfo],
      'keyedu_connection',
    ),
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
