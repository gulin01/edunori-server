// STEP 1: kakao.strategy.ts (OAuth Strategy)
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Function,
  ) {
    const kakaoAccount = profile._json.kakao_account;
    const result = await this.authService.validateOAuthUser({
      provider: 'kakao',
      id: profile.id,
      email: kakaoAccount.email,
      name: kakaoAccount.profile.nickname,
      phone: kakaoAccount.phone_number || null,
    });
    done(null, result);
  }
}
