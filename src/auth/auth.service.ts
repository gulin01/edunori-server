import { kUserService } from './../keyedu/user/kuser.service';
// STEP 2: auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import axios from 'axios';
import { UserService } from 'src/user/user.service';
import { KakaoUser } from './auth.interface';
import * as crypto from 'crypto';
import { kUser } from 'src/keyedu/user/kuser.entity';

interface OAuthProfile {
  provider: 'kakao' | 'naver' | 'google' | 'keyedu';
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
    private readonly kuserRepo: Repository<kUser>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly kUserService: kUserService,
  ) {}

  async validateOAuthUser(profile: OAuthProfile) {
    let user = await this.userRepo.findOne({
      where: [{ provider_name: profile.provider, provider_id: profile.id }],
    });

    if (!user) {
      user = this.userRepo.create({
        password: '',
        name: profile.name,
        email: profile.email,
        mobile_phone: profile.phone || '',
        provider_id: profile.id,
        provider_name: profile.provider,
        join_date: new Date(),
        last_login: new Date(),
        login_cnt: 1,
      });
    } else {
      user.last_login = new Date();
      user.login_cnt += 1;
    }

    // Generate refresh token as JWT
    const refreshPayload = { id: user.uid, type: 'refresh' };
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    // user.refresh_token = refreshToken;
    await this.userRepo.save(user);

    const accessPayload = { id: user.uid };
    const accessToken = this.jwtService.sign(accessPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    return { user, accessToken, refreshToken };
  }

  // async refreshAccessToken(refreshToken: string) {
  //   try {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     const decoded = this.jwtService.verify(refreshToken, {
  //       secret: process.env.JWT_SECRET,
  //     });

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //     if (decoded.type !== 'refresh') {
  //       throw new Error('Invalid token type');
  //     }

  //     const user = await this.userRepo.findOne({
  //       where: { refresh_token: refreshToken },
  //     });
  //     if (!user) throw new Error('User not found');

  //     const newAccessToken = this.jwtService.sign(
  //       { sub: user.code, id: user.id },
  //       {
  //         secret: process.env.JWT_SECRET,
  //         expiresIn: '15m',
  //       },
  //     );

  //     return { accessToken: newAccessToken };
  //   } catch (err: any) {
  //     throw new Error('Invalid or expired refresh token');
  //   }
  // }

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

      const token = this.jwtService.sign({ id: user.uid });

      return { user, token };
    } catch (error) {
      console.error('Kakao login failed:', error);
      throw new UnauthorizedException('Invalid Kakao token');
    }
  }

  async validateKeyEdu(user_id: string, password: string) {
    // Hash the password using MD5 (to match the legacy DB logic)
    const hashedPassword = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');

    // Try to find user by id OR united_id and compare MD5-hashed password
    const user = await this.kUserService.findKeyEduUser(
      user_id,
      hashedPassword,
    );

    if (!user) {
      //createUser
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create user on KeyEdu side if needed
    return await this.userService.createUser({
      ...user,
      name: user.name,
      provider_name: 'key_edu',
    });
  }

  async generateJwt(user: User): Promise<string> {
    const payload = { id: user.uid };
    return await this.jwtService.signAsync(payload);
  }
}
