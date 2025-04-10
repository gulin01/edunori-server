import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateOrderDto } from './order-create.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  order_code: string; // Required for identifying the order to update
}
