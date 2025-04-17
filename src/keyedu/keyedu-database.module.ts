// src/keyedu/keyedu-database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  ProductEntity,
  OrderEntity,
  Lecture,
  LectureCategory,
  LectureMixedInfo,
  MovieInfoEntity,
  TeacherInfo,
  Goods,
  OrderGoodsEntity,
  KeyEduCategory,
  kUser,
} from './index'; // or point to the exact paths
import { BookRoadmapSeries } from './book/entities/book-roadmap-series..entity';
import { BannerInfo } from './book/entities/banner-info.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'keyedu_connection',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('KEYEDU_DB_HOST'),
        port: config.get<number>('KEYEDU_DB_PORT'),
        username: config.get<string>('KEYEDU_DB_USERNAME'),
        password: config.get<string>('KEYEDU_DB_PASSWORD'),
        database: config.get<string>('KEYEDU_DB_DATABASE'),
        entities: [
          kUser,
          ProductEntity,
          OrderEntity,
          Lecture,
          LectureCategory,
          LectureMixedInfo,
          MovieInfoEntity,
          TeacherInfo,
          Goods,
          OrderGoodsEntity,
          KeyEduCategory,
          BookRoadmapSeries,
          BannerInfo,
        ],
        charset: 'utf8mb4',
        synchronize: false,
      }),
    }),
  ],
})
export class KeyeduDatabaseModule {}
