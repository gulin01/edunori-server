import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { TossService } from './toss.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { TossFailQueryDto, TossSuccessQueryDto } from './toss.dto';

@ApiTags('Toss Payments')
@Controller('toss')
export class TossController {
  constructor(private readonly tossService: TossService) {}

  @Post('request')
  @ApiOperation({ summary: 'Initiate a Toss payment request' })
  @ApiBody({
    schema: {
      example: {
        orderId: 'order_12345',
        amount: 1000,
        orderName: 'Edu nori Book',
        customerEmail: 'test@example.com',
        customerName: 'Gul',
      },
    },
  })
  async requestPayment(@Body() body) {
    return this.tossService.requestPayment(body);
  }

  @Get('success')
  @ApiOperation({ summary: 'Handle payment success redirect' })
  async onSuccess(@Query() query: TossSuccessQueryDto) {
    const { paymentKey, orderId, amount } = query;
    const result = await this.tossService.confirmPayment(
      paymentKey,
      orderId,
      Number(amount),
    );
    return result;
  }

  @Get('fail')
  @ApiOperation({ summary: 'Handle payment failure redirect' })
  onFail(@Query() query: TossFailQueryDto) {
    return {
      success: false,
      error: query.message ?? 'Unknown error',
    };
  }
}
