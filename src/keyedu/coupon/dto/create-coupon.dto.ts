// create-coupon.dto.ts
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  coupon_name: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  coupon_keyword: string;

  @IsString()
  @IsOptional()
  coupon_memo?: string;

  @IsInt()
  @Min(0)
  discount_rate: number;

  @IsInt()
  @Min(0)
  discount_price: number;

  @IsInt()
  @Min(0)
  apply_price: number;

  @IsEnum(['fixed', 'each'])
  period_type: 'fixed' | 'each';

  @IsInt()
  @Min(0)
  period_each_days: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsEnum(['all', 'lecture', 'book', 'delivery'])
  target_group: 'all' | 'lecture' | 'book' | 'delivery';

  @IsString()
  @IsNotEmpty()
  admin_id: string;

  @IsInt()
  create_number: number;

  @IsOptional()
  lecture_selected?: number[];

  @IsOptional()
  book_selected?: number[];
}
