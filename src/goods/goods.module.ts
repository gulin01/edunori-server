import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from './entities/goods.entity';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { Module } from '@nestjs/common';
import { BasketModule } from 'src/basket/basket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Goods]), BasketModule],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
