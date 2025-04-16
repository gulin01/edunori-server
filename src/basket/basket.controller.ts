import { Controller, Post, Delete, Body, Param, Get } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketItemDto } from './dto/basket.dto';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get(':userId')
  getBasket(@Param('userId') userId: string) {
    return this.basketService.getBasket(userId);
  }

  @Post(':userId/add')
  addToBasket(@Param('userId') userId: string, @Body() item: BasketItemDto) {
    this.basketService.addToBasket(userId, item);
    return { message: 'Item added' };
  }

  @Get(':userId/quantity/:code')
  getQuantity(@Param('userId') userId: string, @Param('code') code: number) {
    const quantity = this.basketService.getItemQuantity(userId, +code);
    return { quantity };
  }

  @Delete(':userId/remove/:code')
  removeItem(@Param('userId') userId: string, @Param('code') code: number) {
    this.basketService.removeFromBasket(userId, +code);
    return { message: 'Item removed' };
  }

  @Delete(':userId/clear')
  clearBasket(@Param('userId') userId: string) {
    this.basketService.clearBasket(userId);
    return { message: 'Basket cleared' };
  }
}
