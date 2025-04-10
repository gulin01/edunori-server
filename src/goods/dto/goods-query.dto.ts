// dto/goods-query.dto.ts
import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GoodsQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pageSize?: number = 20;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  category?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  brand?: number;

  @ApiPropertyOptional({
    enum: ['y', 'n', 's', 'm'],
    description:
      'Goods display state (y: visible, n: hidden, s: suppressed, m: special state)',
  })
  @IsOptional()
  @IsEnum(['y', 'n', 's', 'm'], { message: 'state must be one of y, n, s, m' })
  state?: 'y' | 'n' | 's' | 'm';
}
