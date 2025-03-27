import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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
  // async refresh(@Body('refreshToken') refreshToken: string) {
  //   return this.authService.refreshAccessToken(refreshToken);
  // }

  @Post('keyedu')
  async keyEdu(
    @Body('user_id') user_id: string,
    @Body('password') password: string,
  ) {
    try {
      // Validate user using KeyEdu login logic
      const user = await this.authService.validateKeyEdu(user_id, password);
      const token = await this.authService.generateJwt(user);
      console.log(token);
      // Return user info and token
      return {
        token,
      };
    } catch (error: any) {
      console.log(error);
      // Optional: add specific error handling or rethrow
      throw new UnauthorizedException('Invalid KeyEdu credentials');
    }
  }
}
