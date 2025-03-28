import { HttpService } from '@nestjs/axios';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { lastValueFrom } from 'rxjs';

interface KakaoTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  @Post('kakao')
  @ApiOperation({ summary: 'Kakao Login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', example: 'kakao_access_token' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT access and refresh tokens.',
  })
  async kakaoLogin(@Body('accessToken') accessToken: string) {
    const user = await this.authService.validateKakao(accessToken);
    const jwt = await this.authService.generateTokens(user);
    user.refresh_token = jwt.refreshToken;
    await this.userService.updateLoginInfo(user);
    return jwt;
  }

  @Post('keyedu')
  @ApiOperation({ summary: 'KeyEdu Login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', example: 'testkey' },
        password: { type: 'string', example: 'test8808' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT access and refresh tokens.',
  })
  @ApiResponse({ status: 401, description: 'Invalid KeyEdu credentials.' })
  async keyEdu(
    @Body('user_id') user_id: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.authService.validateKeyEdu(user_id, password);
      const tokens = await this.authService.generateTokens(user);
      user.refresh_token = tokens.refreshToken;
      await this.userService.updateLoginInfo(user);
      return tokens;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid KeyEdu credentials');
    }
  }

  @Post('refresh')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Refresh JWT tokens' })
  @ApiResponse({
    status: 200,
    description: 'Returns new JWT access and refresh tokens.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token.',
  })
  async refreshTokens(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const refreshToken = authHeader.replace('Bearer ', '').trim();

    try {
      const payload = await this.authService.verifyRefreshToken(refreshToken);
      const user = await this.userService.findById(payload?.id);
      if (!user || !user.refresh_token || user.refresh_token !== refreshToken)
        throw new UnauthorizedException(
          'User not found or user has logged out',
        );

      const tokens = await this.authService.generateTokens(user);
      user.refresh_token = tokens.refreshToken;
      await this.userService.updateLoginInfo(user);
      return tokens;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  @Post('logout')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  @ApiResponse({ status: 401, description: 'Invalid or missing refresh token' })
  async logout(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const refreshToken = authHeader.replace('Bearer ', '').trim();

    try {
      const payload = await this.authService.verifyRefreshToken(refreshToken);
      const user = await this.userService.findById(payload?.id);
      if (!user) throw new UnauthorizedException('User not found');

      user.refresh_token = null;
      await this.userService.update(user);

      return { message: 'Successfully logged out' };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  @Get('kakao/login')
  @ApiOperation({ summary: 'Redirect user to Kakao login page' })
  @ApiResponse({ status: 302, description: 'Redirects to Kakao login page' })
  redirectToKakao(@Res() res: Response) {
    const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.KAKAO_REDIRECT_URI ?? '')}`;
    return res.redirect(kakaoAuthUrl);
  }

  @Get('kakao/callback')
  @ApiOperation({ summary: 'Handle Kakao OAuth callback' })
  @ApiResponse({ status: 200, description: 'Returns JWT tokens on success' })
  @ApiResponse({ status: 400, description: 'Kakao login failed' })
  async kakaoCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('client_id', process.env.KAKAO_CLIENT_ID ?? '');
      params.append('redirect_uri', process.env.KAKAO_REDIRECT_URI ?? '');
      params.append('code', code);

      const tokenResponse = await lastValueFrom(
        this.httpService.post<KakaoTokenResponse>(
          'https://kauth.kakao.com/oauth/token',
          params,
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        ),
      );

      const access_token = tokenResponse.data.access_token;

      const jwtTokens = await lastValueFrom(
        this.httpService.post('http://localhost:3000/auth/kakao', {
          accessToken: access_token,
        }),
      );

      return res.json({
        message: 'Successfully logged in via Kakao',
        ...jwtTokens.data,
      });
    } catch (error) {
      console.error('Kakao callback error:', error);
      return res.status(400).json({ message: 'Kakao login failed' });
    }
  }
}
