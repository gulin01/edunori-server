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

  async validateKakao(accessToken: string) {
    try {
      const kakaoUser = await axios.get<KakaoUser>(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const kakao_no = kakaoUser.data.id.toString();
      const email = kakaoUser.data.kakao_account?.email ?? '';
      const name = kakaoUser.data.kakao_account?.name ?? 'KakoName';
      const phone = kakaoUser.data.kakao_account?.phone_number ?? '';

      let user = await this.userService.findBySocialId(kakao_no);

      if (!user) {
        user = await this.userService.createUser({
          provider_id: kakao_no,
          email: email ?? 'samle@gmail.com',
          name,
          phone,
          provider_name: 'kakao',
        });
      }

      return user;
    } catch (error) {
      console.error('Kakao login failed:', error);
      throw new UnauthorizedException('Invalid Kakao token');
    }
  }

  async validateKeyEdu(userId: string, rawPassword: string) {
    // Hash the password using MD5 (legacy logic)
    const hashedPassword = crypto
      .createHash('md5')
      .update(rawPassword)
      .digest('hex');

    // Step 1: Find user in KeyEdu DB
    const keyEduUser = await this.kUserService.findKeyEduUser(
      userId,
      hashedPassword,
    );

    if (!keyEduUser) {
      throw new UnauthorizedException('Invalid KeyEdu credentials');
    }

    // Step 2: Check if user already exists in Edunori DB
    const existingUser = await this.userRepo.findOne({
      where: { provider_id: keyEduUser.id }, // Make sure this field links to KeyEdu
    });
    // Step 3: If not, create a new Edunori user
    if (!existingUser) {
      const newUser = await this.userService.createUser({
        provider_id: keyEduUser.id,
        provider_name: 'key_edu',
        name: keyEduUser.name ?? '',
        ip_v4: keyEduUser.ip_v4,
        phone: keyEduUser.mobile_phone,
        birthday: keyEduUser.birthday,
        email: keyEduUser.email,
        // Add more mapped fields if needed
      });

      return newUser;
    }

    // Step 4: Return the existing user
    return existingUser;
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { id: user.uid };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(refreshToken: string): Promise<{ id: string }> {
    return this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
