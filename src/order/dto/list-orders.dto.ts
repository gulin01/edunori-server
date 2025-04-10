import { IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class ListOrdersDto {
  @IsInt()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsString()
  id?: string;
}
