// src/keyedu/book/entities/book-roadmap-series.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('book_roadmap_series')
export class BookRoadmapSeries {
  @PrimaryGeneratedColumn({ name: 'series_idx' })
  seriesIdx: number;

  @Column({ name: 'series_name' })
  seriesName: string;

  @Column({ name: 'book_img' })
  bookImg: string;

  @Column({
    name: 'bestsellerYN',
    type: 'enum',
    enum: ['Y', 'N'],
    default: 'N',
  })
  bestsellerYN: 'Y' | 'N';

  @Column()
  signature: string;

  @Column({ name: 'recommend_target' })
  recommendTarget: string;

  @Column({ name: 'book_link' })
  bookLink: string;

  @Column({ name: 'lecture_link' })
  lectureLink: string;

  @Column({ name: 'resources_link' })
  resourcesLink: string;

  @Column({ name: 'reg_date', type: 'datetime' })
  regDate: Date;
}
