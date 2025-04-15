import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCouponDto } from './dto/create-coupon.dto';

import { CouponMain } from './entities/coupon.entity';
import { CouponSub } from './entities/coupon-sub.entity';
import { CouponGoods } from './entities/coupon-goods.entity';
import { CouponAuto } from './entities/coupon-auto.entity';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CreateCouponAutoDto } from './dto/create-coupon-auto.dto';
import { UpdateCouponAutoDto } from './dto/update-coupon-auto.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(CouponMain, 'keyedu_connection')
    private readonly couponMainRepo: Repository<CouponMain>,
    @InjectRepository(CouponSub, 'keyedu_connection')
    private readonly couponSubRepo: Repository<CouponSub>,
    @InjectRepository(CouponGoods, 'keyedu_connection')
    private readonly couponGoodsRepo: Repository<CouponGoods>,
    @InjectRepository(CouponAuto, 'keyedu_connection')
    private readonly couponAutoRepo: Repository<CouponAuto>,
  ) {}

  private pageSize = 20;

  async list(page = 1): Promise<CouponMain[]> {
    const skip = (page - 1) * this.pageSize;
    return this.couponMainRepo.find({
      order: { no: 'DESC' },
      skip,
      take: this.pageSize,
    });
  }

  async view(no: number): Promise<CouponMain> {
    return this.couponMainRepo.findOneOrFail({ where: { no } });
  }

  async create(dto: CreateCouponDto): Promise<CouponMain> {
    const typedDto: CreateCouponDto = dto;

    const {
      coupon_name,
      coupon_keyword,
      discount_rate,
      discount_price,
      apply_price,
      start_date,
      end_date,
      target_group,
      coupon_memo,
      lecture_selected,
      book_selected,
      create_number,
      admin_id,
    } = typedDto;

    const main = this.couponMainRepo.create({
      coupon_name,
      coupon_keyword,
      discount_rate,
      discount_price,
      apply_price,
      start_date,
      end_date,
      coupon_memo,
      target_group,
      reg_date: new Date(),
      admin_id,
    });

    const savedMain = await this.couponMainRepo.save(main);

    // log main info (copy to log table if needed)

    // insert coupon goods
    const selectedItems =
      target_group === 'lecture' ? lecture_selected : book_selected;
    if (selectedItems?.length) {
      const goods = selectedItems.map((code) =>
        this.couponGoodsRepo.create({
          coupon_main_no: savedMain.no,
          gd_type: target_group as 'book' | 'lecture',
          code: Number(code),
        }),
      );
      await this.couponGoodsRepo.save(goods);
    }

    // generate unique coupons
    const prefix = coupon_keyword.toUpperCase();
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const codeLength = 20 - prefix.length;

    const newCoupons: CouponSub[] = [];
    while (newCoupons.length < create_number) {
      const suffix = Array.from(
        { length: codeLength },
        () => charset[Math.floor(Math.random() * charset.length)],
      ).join('');
      const coupon_no = prefix + suffix;
      const exists = await this.couponSubRepo.findOne({ where: { coupon_no } });
      if (!exists) {
        newCoupons.push(
          this.couponSubRepo.create({
            coupon_main_no: savedMain.no,
            coupon_no,
            reg_date: new Date(),
          }),
        );
      }
    }
    await this.couponSubRepo.save(newCoupons);

    return savedMain;
  }

  async update(dto: UpdateCouponDto): Promise<CouponMain> {
    const main = await this.couponMainRepo.findOne({ where: { no: dto.no } });
    if (!main) throw new NotFoundException('쿠폰을 찾을 수 없습니다');

    Object.assign(main, dto, { reg_date: new Date() });
    await this.couponMainRepo.save(main);

    // refresh goods
    await this.couponGoodsRepo.delete({ coupon_main_no: dto.no });
    const selectedItems =
      dto.target_group === 'lecture' ? dto.lecture_selected : dto.book_selected;
    if (selectedItems?.length) {
      const goods = selectedItems.map((code) =>
        this.couponGoodsRepo.create({
          coupon_main_no: dto.no,
          gd_type: (dto.target_group as 'book') || 'lecture',
          code: Number(code),
        }),
      );
      await this.couponGoodsRepo.save(goods);
    }
    return main;
  }

  async getTargetGoods(couponMainNo: number): Promise<CouponGoods[]> {
    return this.couponGoodsRepo.find({
      where: { coupon_main_no: couponMainNo },
    });
  }

  async createAuto(dto: CreateCouponAutoDto): Promise<CouponAuto> {
    const auto = this.couponAutoRepo.create({
      ...dto,
      reg_date: new Date(),
    });
    return this.couponAutoRepo.save(auto);
  }

  async updateAuto(dto: UpdateCouponAutoDto): Promise<CouponAuto> {
    const auto = await this.couponAutoRepo.findOne({ where: { no: dto.no } });
    if (!auto) throw new NotFoundException('자동 발행 설정을 찾을 수 없습니다');

    Object.assign(auto, dto);
    return this.couponAutoRepo.save(auto);
  }

  async listAuto(page = 1): Promise<CouponAuto[]> {
    const skip = (page - 1) * this.pageSize;
    return this.couponAutoRepo.find({
      relations: ['coupon_main'],
      order: { no: 'DESC' },
      skip,
      take: this.pageSize,
    });
  }

  async viewAuto(no: number): Promise<CouponAuto> {
    return this.couponAutoRepo.findOneOrFail({ where: { no } });
  }
}
