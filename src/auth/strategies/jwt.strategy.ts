import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'abc123',
    });
  }

  validate(payload: any) {
    console.log('inside jwt validate');
    console.log('jwt payload', payload);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return payload;
  }
}
