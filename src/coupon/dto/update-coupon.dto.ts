// update-coupon.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { IsInt } from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @IsInt()
  no: number;
}
