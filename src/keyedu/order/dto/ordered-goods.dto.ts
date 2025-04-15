import { IsInt, IsOptional, IsEnum, IsString } from 'class-validator';

export class OrderGoodsDto {
  @IsEnum(['book', 'lecture'])
  gd_type: 'book' | 'lecture';

  @IsInt()
  gd_code: number;

  @IsInt()
  quantity: number;

  @IsInt()
  price: number;

  @IsInt()
  final_price: number;

  @IsInt()
  @IsOptional()
  lect_days?: number;

  @IsString()
  @IsOptional()
  use_coupon_number?: string;
}
