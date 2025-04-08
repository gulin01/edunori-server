import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateGoodsDto {
  @IsInt()
  pd_code: number;

  @IsString()
  gd_subject: string;

  @IsString()
  @IsOptional()
  summary_subject?: string;

  @IsInt()
  gd_price: number;

  @IsInt()
  cash_price: number;

  @IsInt()
  millage: number;

  @IsInt()
  stock: number;

  @IsString()
  delivery: string;

  @IsString()
  pay_method: string;

  @IsInt()
  card_pay_install: number;

  @IsString()
  new_flag: string;

  @IsString()
  cool_flag: string;

  @IsString()
  recommend_flag: string;

  @IsString()
  booking_flag: string;

  @IsString()
  preview: string;

  @IsString()
  state: string;

  @IsString()
  memo: string;

  @IsInt()
  order_grade: number;
}
