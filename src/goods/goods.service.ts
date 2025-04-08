import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Goods } from './entities/goods.entity';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { BasketItemForOrder } from './interfaces/BasketItemForOrder';
import { BasketService } from 'src/basket/basket.service';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private readonly goodsRepo: Repository<Goods>,
    private readonly basketService: BasketService, // ? inject BasketService
  ) {}

  async create(createDto: CreateGoodsDto): Promise<Goods> {
    const goods = this.goodsRepo.create({
      ...createDto,
      regdate: new Date(),
    });

    return await this.goodsRepo.save(goods);
  }

  async update(code: number, updateDto: UpdateGoodsDto): Promise<Goods> {
    const goods = await this.goodsRepo.findOne({ where: { code } });
    if (!goods) throw new NotFoundException('Goods not found');

    Object.assign(goods, updateDto);
    return await this.goodsRepo.save(goods);
  }

  async delete(code: number): Promise<void> {
    const result = await this.goodsRepo.delete(code);
    if (result.affected === 0)
      throw new NotFoundException('Goods not found or already deleted');
  }

  async findOne(code: number): Promise<Goods> {
    const goods = await this.goodsRepo.findOne({ where: { code } });
    if (!goods) throw new NotFoundException('Goods not found');
    return goods;
  }

  async findAll(params: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    category?: number;
    brand?: number;
    state?: string;
  }) {
    const { page = 1, pageSize = 20, keyword, category, brand, state } = params;

    const query = this.goodsRepo
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.product', 'p') // If relation exists
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (keyword) {
      query.andWhere('g.gd_subject LIKE :kw OR p.pd_name LIKE :kw', {
        kw: `%${keyword}%`,
      });
    }

    if (category) query.andWhere('p.category = :cat', { cat: category });
    if (brand) query.andWhere('p.brand = :brand', { brand });
    if (state) query.andWhere('g.state = :state', { state });

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      pageSize,
    };
  }

  async getGoodsFromBasket(userId: string): Promise<BasketItemForOrder[]> {
    const basketItems = await this.basketService.getBasket(userId); // ? clean call

    if (!basketItems.length) return [];

    const codes = basketItems.map((b) => b.gd_code);

    const goods: Goods = await this.goodsRepo.findBy({
      code: In(codes),
      state: 'y',
    });
    return basketItems.map((item): BasketItemForOrder => {
      const matched = goods.find((g: any) => g.code === item.gd_code);
      if (!matched) {
        throw new BadRequestException(
          `상품 코드 ${item.gd_code}이 존재하지 않습니다.`,
        );
      }

      return {
        code: matched.code,
        type: item.gd_type,
        quantity: item.quantity,
        gd_price: matched.gd_price,
        gd_subject: matched.gd_subject,
        card_pay_install: matched.card_pay_install,
        lect_days: matched.lect_days ?? 0,
      };
    });
  }
}
