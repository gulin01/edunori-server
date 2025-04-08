import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order-create.dto';
import { UpdateOrderDto } from './dto/order-update.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { UpdateOrderStateDto } from './dto/update-order-state.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * �ֹ� ����
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  /**
   * �ֹ� ����
   */
  @Put(':orderCode')
  async updateOrder(
    @Param('orderCode') orderCode: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.orderService.update(orderCode, dto);
  }

  /**
   * �ֹ� �� ��ȸ
   */
  @Get(':orderCode')
  async getOrder(@Param('orderCode') orderCode: string) {
    return this.orderService.view(orderCode);
  }

  /**
   * �ֹ� ��� ��ȸ (pagination + filters)
   */
  @Get()
  async listOrders(
    @Query('page', ParseIntPipe) page = 1,
    @Query('state') state?: string,
    @Query('method') method?: string,
    @Query('id') id?: string,
    @Query('attribute') attribute?: string,
    @Query('keyword') keyword?: string,
    @Query('where') whereCondition?: string,
  ) {
    return this.orderService.list({
      page,
      state,
      method,
      id,
      attribute,
      keyword,
      whereCondition,
    });
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
