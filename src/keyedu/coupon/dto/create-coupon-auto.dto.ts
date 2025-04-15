// create-coupon-auto.dto.ts
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCouponAutoDto {
  @IsInt()
  coupon_main_no: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsString()
  @IsOptional()
  memo?: string;

  @IsOptional()
  state?: 'Y' | 'N';
}
