import { IsString, IsInt, IsOptional, IsIn } from 'class-validator';

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
  @IsOptional()
  card_pay_install?: number;

  @IsIn(['y', 'n'])
  @IsOptional()
  new_flag?: 'y' | 'n';

  @IsIn(['y', 'n'])
  @IsOptional()
  cool_flag?: 'y' | 'n';

  @IsIn(['y', 'n'])
  @IsOptional()
  recommend_flag?: 'y' | 'n';

  @IsIn(['y', 'n'])
  @IsOptional()
  booking_flag?: 'y' | 'n';

  @IsIn(['y', 'n'])
  @IsOptional()
  preview?: 'y' | 'n';

  @IsIn(['y', 'n', 's', 'm'])
  @IsOptional()
  state?: 'y' | 'n' | 's' | 'm';

  @IsString()
  @IsOptional()
  memo?: string;

  @IsInt()
  @IsOptional()
  order_grade?: number;
}
