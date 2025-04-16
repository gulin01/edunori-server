// toss.module.ts
import { Module } from '@nestjs/common';
import { TossService } from './toss.service';
import { TossController } from './toss.controller';

@Module({
  controllers: [TossController],
  providers: [TossService],
})
export class TossModule {}
