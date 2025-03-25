import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  validate(
    provider: 'kakao' | 'naver' | 'google',
    id: string,
    name: string,
    password: string,
    email: string,
    phone: string,
  ) {
    console.log('inside local strategy');
    const user = this.authService.validateOAuthUser({
      provider,
      id,
      email,
      name,
      phone,
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
