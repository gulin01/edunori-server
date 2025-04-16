// dto/create-order.dto.ts
import {
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderMethod, OrderState } from '../entities/order.entity';
import { OrderGoodsDto } from './ordered-goods.dto';

export class CreateOrderDto {
  @IsString() id: string;
  @IsString() name: string;
  @IsString() order_name: string;
  @IsEmail() email: string;
  @IsString() address1: string;
  @IsString() @IsOptional() address2?: string;
  @IsString() phone: string;
  @IsString() mobile_phone: string;
  @IsString() @IsOptional() zipcode?: string;
  @IsEnum(OrderMethod) order_method: OrderMethod;
  @IsString() @IsOptional() order_message?: string;
  @IsEnum(OrderState) @IsOptional() state?: OrderState;
  @IsInt() order_total_price: number;
  @IsInt() @IsOptional() card_pay_install?: number;
  @IsString() order_goods_name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderGoodsDto)
  items: OrderGoodsDto[];
}
