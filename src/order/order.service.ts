// order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOrderStateDto } from './dto/update-order-state.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { OrderEntity, OrderState } from './entities/order.entity';
import { OrderGoodsEntity } from './entities/ordered-goods.entity';
import { CreateOrderDto } from './dto/order-create.dto';
import { UpdateOrderDto } from './dto/order-update.dto';
import { ListOrdersDto } from './dto/list-orders.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(OrderGoodsEntity)
    private readonly orderGoodsRepo: Repository<OrderGoodsEntity>,
  ) {}

  async listOrders(filters: ListOrdersDto) {
    const take = 20;
    const skip = (filters.page - 1) * take;

    return this.orderRepo.find({
      where: {}, // apply filters later
      order: { code: 'DESC' },
      take,
      skip,
    });
  }

  async viewOrder(orderCode: string) {
    const order = await this.orderRepo.findOne({
      where: { order_code: orderCode },
      relations: ['goods'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async createOrder(dto: CreateOrderDto) {
    const now = new Date();
    const baseOrder = this.orderRepo.create({
      ...dto,
      order_date: now,
      state: dto.state || OrderState.M0,
    });
    const savedOrder = await this.orderRepo.save(baseOrder);

    const goods = dto.items.map((item) =>
      this.orderGoodsRepo.create({
        ...item,
        order_code: savedOrder.order_code,
      }),
    );
    await this.orderGoodsRepo.save(goods);

    return savedOrder;
  }

  async updateOrder(orderCode: string, dto: UpdateOrderDto) {
    await this.orderRepo.update({ order_code: orderCode }, dto);
    return this.viewOrder(orderCode);
  }

  async updateState(orderCode: string, dto: UpdateOrderStateDto) {
    await this.orderRepo.update(
      { order_code: orderCode },
      {
        state: dto.state,
        result_date: dto.state === OrderState.M1 ? new Date() : undefined,
      },
    );
    return this.viewOrder(orderCode);
  }

  async updateDelivery(orderCode: string, dto: UpdateDeliveryDto) {
    await this.orderRepo.update(
      { order_code: orderCode },
      {
        delivery: dto.delivery,
        invoice_number: dto.invoice_number,
      },
    );
    return this.viewOrder(orderCode);
  }

  async deleteOrder(orderCode: string) {
    await this.orderGoodsRepo.delete({ order_code: orderCode });
    await this.orderRepo.delete({ order_code: orderCode });
    return { success: true };
  }
}
