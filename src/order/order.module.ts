import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderGoodsEntity } from './entities/ordered-goods.entity';
import { OrderService } from './order.service';
import { OrderController } from './oder.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderGoodsEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrdersModule {}
