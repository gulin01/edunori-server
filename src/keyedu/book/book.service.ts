import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { BookRoadmapSeries } from './entities/book-roadmap-series..entity';
import {
  BannerInfo,
  BannerPosition,
  LinkCommon,
  StateType,
} from './entities/banner-info.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRoadmapSeries, 'keyedu_connection')
    private readonly seriesRepo: Repository<BookRoadmapSeries>,
    @InjectRepository(BannerInfo, 'keyedu_connection')
    private readonly bannerRepo: Repository<BannerInfo>,
  ) {}

  async getBestsellerBanners() {
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

    const banners = await this.bannerRepo.find({
      where: {
        position: BannerPosition.bestseller,
        state: StateType.Y,
        start_date: LessThanOrEqual(today),
        end_date: MoreThanOrEqual(today),
      },
      order: {
        ordno: 'ASC',
      },
    });

    console.log('Bestseller Banners:', banners);

    return banners.map((banner) => ({
      title: banner.banner_name,
      image: banner.banner_img_m || banner.banner_img,
      link:
        banner.link_common === LinkCommon.Y
          ? banner.link_info
          : banner.link_info_m,
      target:
        banner.link_common === LinkCommon.Y
          ? banner.link_target
          : banner.link_target_m,
      background: banner.back_color,
      points: 500,
      rate: 4.9,
      totalReviews: 100,
    }));
  }
}
