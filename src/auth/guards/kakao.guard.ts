import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class KakaoAuthGuard extends AuthGuard('kakao') {
  constructor() {
    super();
  }
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('카카오 로그인 실패');
    }
    return user;
  }
}
