import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    // keyedu login
    return req.user;
  }

  @Post('kakao')
  async kakaoLogin(@Body('accessToken') accessToken: string) {
    console.log('accessToken', accessToken);
    const user = await this.authService.validateKakao(accessToken);
    const jwt = await this.authService.generateJwt(user.user);
    return { user, token: jwt };
  }
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
