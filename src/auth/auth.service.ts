// STEP 2: auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import axios from 'axios';
import { UserService } from 'src/user/user.service';
import { KakaoUser } from './auth.interface';

interface OAuthProfile {
  provider: 'kakao' | 'naver' | 'google';
  id: string;
  email: string;
  name: string;
  phone: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateOAuthUser(profile: OAuthProfile) {
    let user = await this.userRepo.findOne({
      where: [
        { id_provider: profile.provider, kakao_no: profile.id },
        { id_provider: profile.provider, united_id: profile.id },
      ],
    });

    if (!user) {
      user = this.userRepo.create({
        id: profile.email || `${profile.provider}_${profile.id}`,
        password: '',
        name: profile.name,
        email: profile.email,
        mobile_phone: profile.phone || '',
        kakao_no: profile.id,
        united_id: profile.id,
        id_provider: profile.provider,
        state: 'y',
        join_date: new Date(),
        last_login: new Date(),
        login_cnt: 1,
        grade: 1,
      });
    } else {
      user.last_login = new Date();
      user.login_cnt += 1;
    }

    // Generate refresh token as JWT
    const refreshPayload = { sub: user.code, id: user.id, type: 'refresh' };
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    user.refresh_token = refreshToken;
    await this.userRepo.save(user);

    const accessPayload = { sub: user.code, id: user.id };
    const accessToken = this.jwtService.sign(accessPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    return { user, accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      const user = await this.userRepo.findOne({
        where: { refresh_token: refreshToken },
      });
      if (!user) throw new Error('User not found');

      const newAccessToken = this.jwtService.sign(
        { sub: user.code, id: user.id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      );

      return { accessToken: newAccessToken };
    } catch (err: any) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  async validateKakao(accessToken: string) {
    try {
      const kakaoUser = await axios.get<KakaoUser>(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      console.log(kakaoUser.data, 'kakaoUser');

      const kakao_no = kakaoUser.data.id.toString();
      const email = kakaoUser.data.kakao_account?.email ?? '';
      const name = kakaoUser.data.kakao_account?.name ?? 'KakoName';
      const phone_number = kakaoUser.data.kakao_account?.phone_number ?? '';
      console.log(kakao_no, email, name, 'KAKAO USER CREDETIALS');

      let user = await this.userService.findByKakaoId(kakao_no);

      if (!user) {
        user = await this.userService.createWithKakao({
          kakao_no,
          email: email ?? 'samle@gmail.com',
          name,
          phone_number,
          id_provider: 'kakao',
        });
      }

      const token = this.jwtService.sign({ sub: user.id });

      return { user, token };
    } catch (error) {
      console.error('Kakao login failed:', error);
      throw new UnauthorizedException('Invalid Kakao token');
    }
  }

  async generateJwt(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }
}
