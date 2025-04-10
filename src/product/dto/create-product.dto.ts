// dto/create-product.dto.ts
import { IsString, IsInt, IsEnum, IsOptional, IsDate } from 'class-validator';
import { ProductState, YnFlag } from '../entities/product.entity';

export class CreateProductDto {
  @IsInt() category: number;
  @IsInt() brand: number;
  @IsString() pd_name: string;
  @IsInt() pd_price: number;
  @IsEnum(YnFlag) @IsOptional() bundle?: YnFlag;
  @IsEnum(ProductState) @IsOptional() state?: ProductState;
  @IsEnum(YnFlag) @IsOptional() teacher_item?: YnFlag;
  @IsEnum(YnFlag) @IsOptional() image?: YnFlag;
  @IsEnum(YnFlag) @IsOptional() sub_image?: YnFlag;
  @IsEnum(YnFlag) @IsOptional() mobile_image?: YnFlag;
  @IsInt() @IsOptional() hit?: number;
  @IsInt() @IsOptional() lect_no?: number;
  @IsInt() @IsOptional() sugang_main_no?: number;
  @IsString() @IsOptional() slink?: string;
  @IsInt() @IsOptional() item_qty?: number;
  @IsDate() @IsOptional() regdate?: Date;
}
