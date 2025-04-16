import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketEntity } from './entities/basket.entity';
import { BasketItemDto } from './dto/basket.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity, 'edunori_connection')
    private readonly basketRepo: Repository<BasketEntity>,
  ) {}
  async getBasket(userId: string): Promise<BasketEntity[]> {
    return this.basketRepo.find({ where: { user_id: userId } });
  }

  async addToBasket(userId: string, item: BasketItemDto): Promise<void> {
    const existing = await this.basketRepo.findOne({
      where: { user_id: userId, gd_code: item.code },
    });

    if (existing) {
      existing.quantity += item.quantity;
      await this.basketRepo.save(existing);
    } else {
      const newItem = this.basketRepo.create({
        user_id: userId,
        gd_code: item.code,
        gd_type: item.type,
        quantity: item.quantity,
      });
      await this.basketRepo.save(newItem);
    }
  }

  async getItemQuantity(userId: string, code: number): Promise<number> {
    const item = await this.basketRepo.findOne({
      where: { user_id: userId, gd_code: code },
    });
    return item ? item.quantity : 0;
  }

  async removeFromBasket(userId: string, code: number): Promise<void> {
    const item = await this.basketRepo.findOne({
      where: { user_id: userId, gd_code: code },
    });
    if (!item) throw new NotFoundException('Item not found in basket');
    await this.basketRepo.remove(item);
  }

  async clearBasket(userId: string): Promise<void> {
    await this.basketRepo.delete({ user_id: userId });
  }
}
