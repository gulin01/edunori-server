import { IsEnum, IsOptional } from 'class-validator';
import { OrderState } from '../entities/order.entity';

export class UpdateOrderStateDto {
  @IsEnum(OrderState)
  state: OrderState;

  @IsOptional()
  markResultDate?: boolean;
}
