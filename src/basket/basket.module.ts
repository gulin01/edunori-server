import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Goods } from 'src/goods/entities/goods.entity';
import { BasketEntity } from './entities/basket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketEntity, Goods])],
  controllers: [BasketController],
  exports: [BasketService], // ? <--- This line is required!

  providers: [BasketService],
})
export class BasketModule {}
