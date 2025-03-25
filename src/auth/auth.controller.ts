import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { KakaoAuthGuard } from './guards/kakao.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('authorizagiton with bearer token GET');
    console.log(req.user);
    return req.user;
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  // eslint-disable-next-line @typescript-eslint/require-await
  async kakaoCallback(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const { user, accessToken, refreshToken } = req.user;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { user, accessToken, refreshToken };
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
