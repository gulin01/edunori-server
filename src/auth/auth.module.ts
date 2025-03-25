import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm'; // ✅ add this
import { User } from '../user/user.entity'; // ✅ import User entity

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forFeature([User]), // ✅ register User entity here
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, KakaoStrategy],
})
export class AuthModule {}
