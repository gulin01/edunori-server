import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order-create.dto';
import { UpdateOrderDto } from './dto/order-update.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UpdateOrderStateDto } from './dto/update-order-state.dto';
import { ListOrdersDto } from './dto/list-orders.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * �ֹ� ����
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(dto);

    return newOrder;
  }

  /**
   * �ֹ� ����
   */
  @Put(':orderCode')
  async updateOrder(
    @Param('orderCode') orderCode: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(orderCode, dto);
  }

  /**
   * �ֹ� �� ��ȸ
   */
  @Get(':orderCode')
  async getOrder(@Param('orderCode') orderCode: string) {
    return this.orderService.viewOrder(orderCode);
  }

  /**
   * �ֹ� ��� ��ȸ (pagination + filters)
   */
  @Get()
  listOrders(@Query() filters: ListOrdersDto) {
    return this.orderService.listOrders(filters);
  }

  /**
   * �ֹ� ���� ������Ʈ (���� �Ϸ�, ����� ��)
   */
  @Put(':orderCode/state')
  async updateOrderState(
    @Param('orderCode') orderCode: string,
    @Body() dto: UpdateOrderStateDto,
  ) {
    return this.orderService.updateState(orderCode, dto);
  }

  /**
   * ������� ������Ʈ
   */
  @Put(':orderCode/delivery')
  async updateDeliveryInfo(
    @Param('orderCode') orderCode: string,
    @Body() dto: UpdateDeliveryDto,
  ) {
    return this.orderService.updateDelivery(orderCode, dto);
  }
}
