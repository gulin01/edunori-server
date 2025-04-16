import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { LectureMixedInfo } from './entities/lecture-mixed-info.entity';
import { Goods } from '../goods/entities/goods.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Lecture, Goods, LectureMixedInfo],
      'keyedu_connection',
    ),
  ],
  controllers: [LectureController],
  providers: [LectureService],
})
export class LectureModule {}
