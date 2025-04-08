import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateLectureDto, UpdateLectureDto } from './dto';
import { Lecture } from './entities/lecture.entity';
import { Goods } from 'src/goods/entities/goods.service';
import { ProductEntity } from 'src/product/entities/product.entity';
import { TeacherInfo } from 'src/teacher/entity/teacher.entity';
import { MovieInfoEntity } from 'src/movie/entities/move.entity';
import { LectureMixedInfo } from './entities/lecture-mixed-info.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture) private lectureRepo: Repository<Lecture>,
    @InjectRepository(TeacherInfo) private teacherRepo: Repository<TeacherInfo>,
    @InjectRepository(MovieInfoEntity)
    @InjectRepository(Goods)
    private goodsRepo: Repository<Goods>,
    @InjectRepository(ProductEntity)
    @InjectRepository(LectureMixedInfo)
    private mixedRepo: Repository<LectureMixedInfo>,
  ) {}

  private readonly pageSize = 20;

  async create(dto: CreateLectureDto, fileUrl?: string): Promise<Lecture> {
    const { item_unit, item_no, ...lectureData } = dto;

    const lecture = this.lectureRepo.create({
      ...lectureData,
      lect_photo: fileUrl,
      reg_date: new Date(),
    });

    const saved = await this.lectureRepo.save(lecture);

    if (item_unit === 'mixed' && item_no?.length) {
      const mixItems = item_no.map((lectNo) =>
        this.mixedRepo.create({ ref_no: saved.lect_no, lect_no: lectNo }),
      );
      await this.mixedRepo.save(mixItems);
    }

    return saved;
  }

  async update(dto: UpdateLectureDto, fileUrl?: string): Promise<Lecture> {
    const lecture = await this.lectureRepo.findOne({
      where: { lect_no: dto.lect_no },
    });
    if (!lecture) throw new BadRequestException('Lecture not found');

    Object.assign(lecture, dto);
    if (fileUrl) {
      lecture.lect_photo = fileUrl;
    }

    return this.lectureRepo.save(lecture);
  }

  async list(page = 1): Promise<Lecture[]> {
    const skip = (page - 1) * this.pageSize;
    return this.lectureRepo.find({
      order: { lect_no: 'DESC' },
      skip,
      take: this.pageSize,
    });
  }

  async singleList(): Promise<Lecture[]> {
    return this.lectureRepo.find({
      where: { item_unit: 'single', lect_state: 'y' },
      order: { lect_name: 'ASC' },
    });
  }

  async allLectures(): Promise<Lecture[]> {
    return this.lectureRepo.find({
      where: { lect_state: 'y' },
      order: { item_unit: 'ASC', lect_name: 'ASC' },
    });
  }

  async getMixedLecture(refNo: number): Promise<string[]> {
    const mixes = await this.mixedRepo.find({
      where: { ref_no: refNo },
      relations: ['lecture'],
    });

    return mixes.map((mix) => mix.lecture.lect_name);
  }

  async view(lectNo: number): Promise<Lecture> {
    return this.lectureRepo.findOneOrFail({ where: { lect_no: lectNo } });
  }

  async bookList(): Promise<Goods[]> {
    return this.goodsRepo.find({
      where: { state: 'y' },
      order: { pd_name: 'ASC' },
      relations: ['product'],
    });
  }

  async findByCategory(lectcate_no: number): Promise<Lecture[]> {
    return this.lectureRepo.find({
      where: { lectcate_no, lect_state: 'y' },
      order: { lect_name: 'ASC' },
    });
  }
}
