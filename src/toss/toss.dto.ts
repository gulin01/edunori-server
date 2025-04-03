import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class TossSuccessQueryDto {
  @ApiProperty()
  @IsString()
  paymentKey: string;

  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsNumberString()
  amount: string; // Note: It's string because query params are always strings
}

export class TossFailQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}
