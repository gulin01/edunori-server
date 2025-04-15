import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { BasketEntity } from './entities/basket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketEntity], 'edunori_connection'),
    // TypeOrmModule.forFeature([Goods], 'keyedu_connection'),
  ],
  controllers: [BasketController],
  exports: [BasketService], // ? <--- This line is required!

  providers: [BasketService],
})
export class BasketModule {}
