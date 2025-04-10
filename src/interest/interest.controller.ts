// interest.controller.ts
import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthRequest } from 'src/common/types/auth-request.interface';

@UseGuards(JwtAuthGuard)
@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post()
  create(@Body() dto: CreateInterestDto) {
    return this.interestService.create(dto);
  }

  @Post('/user')
  setUserInterests(@Req() req: AuthRequest, @Body() interestIds: number[]) {
    return this.interestService.saveUserInterests(req.user.uid, interestIds);
  }

  @Get('/user/:userId')
  getUserInterests(@Req() req: AuthRequest) {
    return this.interestService.getUserInterests(req.user.uid);
  }
}
