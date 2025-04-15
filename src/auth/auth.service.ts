import { kUserService } from './../keyedu/user/kuser.service';
// STEP 2: auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import axios, { AxiosResponse } from 'axios';
import { UserService } from 'src/user/user.service';
import { KakaoUser } from './auth.interface';
import * as crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { importJWK, jwtVerify } from 'jose';

interface OAuthProfile {
  provider: 'kakao' | 'naver' | 'google' | 'keyedu';
  id: string;
  email: string;
  name: string;
  phone: string | null;
}

interface NaverProfile {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname?: string;
    name?: string;
    email?: string;
    // You can add more fields if needed
  };
}

interface GoogleProfile {
  id: string;
  email: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
}

interface ApplePublicKey {
  kid: string;
  kty: string;
  alg: string;
  use: string;
  n: string;
  e: string;
}

interface AppleKeyResponse {
  keys: ApplePublicKey[];
}

interface AppleJwtPayload {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?:
    | string
    | {
        firstName?: string;
        lastName?: string;
      };
  // Add more if needed
}

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    @InjectRepository(User, 'edunori_connection')
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly kUserService: kUserService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

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
    const refreshPayload = { uid: user.uid, type: 'refresh' };
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    // user.refresh_token = refreshToken;
    await this.userRepo.save(user);

    const accessPayload = { uid: user.uid };
    const accessToken = this.jwtService.sign(accessPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
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

      let user = await this.userService.findBySocialId(kakao_no, 'kakao');

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
    const payload = { uid: user.uid };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return { accessToken, refreshToken };
  }

  async validateNaver(accessToken: string): Promise<User> {
    const profileResponse: AxiosResponse<NaverProfile> = await axios.get(
      'https://openapi.naver.com/v1/nid/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const profile = profileResponse.data.response;

    console.log('NAVER DATA', profile);

    if (!profile || !profile.id) {
      throw new UnauthorizedException('Invalid Naver token');
    }

    // Check if user exists
    let user = await this.userService.findBySocialId(profile.id, 'naver');

    // If not, create new user
    if (!user) {
      user = await this.userService.createUser({
        provider_id: profile.id,
        provider_name: 'naver',
        name: profile.name || profile.nickname || 'NaverUser',
        email: profile.email || '',
      });
    }

    return user;
  }

  async validateGoogle(accessToken: string): Promise<User> {
    const profileResponse: AxiosResponse<GoogleProfile> = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const profile = profileResponse.data;
    console.log(profile, 'GOOGLE RESPONSE');

    if (!profile || !profile.id) {
      throw new UnauthorizedException('Invalid Google token');
    }

    const googleId = profile.id;
    const name = profile.name || 'GoogleUser';
    const email = profile.email || '';

    let user = await this.userService.findBySocialId(googleId, 'google');

    if (!user) {
      user = await this.userService.createUser({
        provider_id: googleId,
        provider_name: 'google',
        name,
        email,
      });
    }

    return user;
  }

  async validateApple(identityToken: string): Promise<User> {
    const appleKeysUrl = 'https://appleid.apple.com/auth/keys';

    // Fetch Apple??�s public keys
    const res: AxiosResponse<AppleKeyResponse> = await axios.get(appleKeysUrl);
    const keys = res.data.keys;

    const { payload } = await jwtVerify<AppleJwtPayload>(
      identityToken,
      async (header) => {
        const key = keys.find((k): k is ApplePublicKey => k.kid === header.kid);
        if (!key) throw new UnauthorizedException('Invalid Apple token');
        return await importJWK(key, 'RS256');
      },
    );

    if (!payload || typeof payload.sub !== 'string') {
      throw new UnauthorizedException('Invalid Apple identity token');
    }

    const appleId = payload.sub;
    const email = typeof payload.email === 'string' ? payload.email : '';

    // Handle name (if Apple sends it ??? usually on first login only)
    const nameData = payload.name;
    let fullName = '';

    if (typeof nameData === 'string') {
      fullName = nameData;
    } else if (nameData && (nameData.firstName || nameData.lastName)) {
      fullName =
        `${nameData.firstName ?? ''} ${nameData.lastName ?? ''}`.trim();
    }

    let user = await this.userService.findBySocialId(appleId, 'apple');

    if (!user) {
      user = await this.userService.createUser({
        provider_id: appleId,
        provider_name: 'apple',
        name: fullName,
        email,
      });
    }
    return user;
  }

  async verifyRefreshToken(refreshToken: string): Promise<{ id: string }> {
    return this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
