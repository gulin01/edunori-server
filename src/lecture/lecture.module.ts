import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { LectureMixedInfo } from './entities/lecture-mixed-info.entity';
import { MovieInfoEntity } from 'src/movie/entities/move.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { TeacherInfo } from 'src/teacher/entity/teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lecture,
      LectureMixedInfo,
      MovieInfoEntity,
      ProductEntity,
      TeacherInfo,
    ]),
  ],
  controllers: [LectureController],
  providers: [LectureService],
})
export class LectureModule {}
