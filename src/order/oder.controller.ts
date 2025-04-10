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
   * 주문 생성
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(dto);

    return newOrder;
  }

  /**
   * 주문 수정
   */
  @Put(':orderCode')
  async updateOrder(
    @Param('orderCode') orderCode: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(orderCode, dto);
  }

  /**
   * 주문 상세 조회
   */
  @Get(':orderCode')
  async getOrder(@Param('orderCode') orderCode: string) {
    return this.orderService.viewOrder(orderCode);
  }

  /**
   * 주문 목록 조회 (pagination + filters)
   */
  @Get()
  listOrders(@Query() filters: ListOrdersDto) {
    return this.orderService.listOrders(filters);
  }

  /**
   * 주문 상태 업데이트 (결제 완료, 배송중 등)
   */
  @Put(':orderCode/state')
  async updateOrderState(
    @Param('orderCode') orderCode: string,
    @Body() dto: UpdateOrderStateDto,
  ) {
    return this.orderService.updateState(orderCode, dto);
  }

  /**
   * 배송정보 업데이트
   */
  @Put(':orderCode/delivery')
  async updateDeliveryInfo(
    @Param('orderCode') orderCode: string,
    @Body() dto: UpdateDeliveryDto,
  ) {
    return this.orderService.updateDelivery(orderCode, dto);
  }
}
