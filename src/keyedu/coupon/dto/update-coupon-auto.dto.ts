// update-coupon-auto.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateCouponAutoDto } from './create-coupon-auto.dto';

export class UpdateCouponAutoDto extends PartialType(CreateCouponAutoDto) {
  @IsInt()
  no: number;
}
