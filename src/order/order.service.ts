import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderGoodsEntity } from './entities/order-good.entity';
import { CreateOrderDto } from './dto/order-create.dto';
import { GoodsService } from 'src/goods/goods.service';
import { CouponService } from 'src/coupon/coupon.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UpdateOrderStateDto } from './dto/update-order-state.dto';
import { UpdateOrderDto } from './dto/order-update.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,

    @InjectRepository(OrderGoodsEntity)
    private readonly orderGoodsRepo: Repository<OrderGoodsEntity>,

    private readonly goodsService: GoodsService, //contineeeee
    private readonly couponService: CouponService,
  ) {}

  private readonly pageSize = 20;

  async create(dto: CreateOrderDto): Promise<CreateOrderDto> {
    const goodsList = await this.goodsService.getGoodsFromBasket(dto.basket);
    if (!goodsList.length) {
      throw new BadRequestException('장바구니가 비어있습니다.');
    }

    // Create the order instance
    const order = this.orderRepo.create({
      ...dto,
      state: 'M0',
      order_total_price: 0,
      reg_date: new Date(),
    });

    let total = 0;
    const goodsEntities = goodsList.map((item) => {
      const final_price = item.gd_price * item.quantity;
      total += final_price;
      return this.orderGoodsRepo.create({
        gd_code: item.code,
        gd_type: item.type,
        quantity: item.quantity,
        price: item.gd_price,
        final_price,
        order,
        lect_days: item.lect_days || 0,
      });
    });

    order.order_goods_name =
      goodsList.length === 1
        ? goodsList[0].gd_subject
        : `${goodsList[0].gd_subject} 외 ${goodsList.length - 1}종`;

    order.order_total_price = total;
    order.card_pay_install = Math.min(
      ...goodsList.map((g) => g.card_pay_install ?? 0),
    );

    // Save everything in a transaction
    return await this.dataSource.transaction(async (manager) => {
      const savedOrder = await manager.save(order);
      await manager.save(goodsEntities);

      if (dto.coupon_no) {
        await this.couponService.applyCoupon(
          dto.coupon_no,
          savedOrder.order_code,
        );
      }

      return savedOrder;
    });
  }
  async update(orderCode: string, dto: UpdateOrderDto): Promise<OrderEntity> {
    const order = await this.orderRepo.findOne({
      where: { order_code: orderCode },
    });
    if (!order) throw new NotFoundException('주문을 찾을 수 없습니다.');

    Object.assign(order, dto);
    return this.orderRepo.save(order);
  }

  async view(orderCode: string): Promise<OrderEntity> {
    const order = await this.orderRepo.findOne({
      where: { order_code: orderCode },
      relations: ['goods'],
    });
    if (!order) throw new NotFoundException('주문을 찾을 수 없습니다.');
    return order;
  }

  async list(filter: {
    page: number;
    state?: string;
    method?: string;
    id?: string;
    attribute?: string;
    keyword?: string;
  }): Promise<{ data: OrderEntity[]; total: number }> {
    const { page, state, method, id, attribute, keyword } = filter;

    const query = this.orderRepo
      .createQueryBuilder('order')
      .orderBy('order.order_date', 'DESC')
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize);

    if (state) query.andWhere('order.state = :state', { state });
    if (method) query.andWhere('order.order_method = :method', { method });
    if (id) query.andWhere('order.id = :id', { id });

    const allowedAttributes = ['name', 'email', 'order_goods_name'];
    if (keyword && attribute && allowedAttributes.includes(attribute)) {
      query.andWhere(`order.${attribute} ILIKE :kw`, { kw: `%${keyword}%` });
    }

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  async updateState(orderCode: string, dto: UpdateOrderStateDto) {
    const order = await this.orderRepo.findOne({
      where: { order_code: orderCode },
    });
    if (!order) throw new NotFoundException('주문을 찾을 수 없습니다.');

    order.state = dto.state;
    if (dto.markResultDate) {
      order.result_date = new Date();
    }
    return this.orderRepo.save(order);
  }

  async updateDelivery(orderCode: string, dto: UpdateDeliveryDto) {
    const order = await this.orderRepo.findOne({
      where: { order_code: orderCode },
    });
    if (!order) throw new NotFoundException('주문을 찾을 수 없습니다.');

    order.delivery = dto.delivery;
    order.invoice_number = dto.invoice_number;
    return this.orderRepo.save(order);
  }
}
