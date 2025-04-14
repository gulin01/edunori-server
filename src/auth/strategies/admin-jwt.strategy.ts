// src/auth/strategies/admin-jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AdminUser } from 'src/admin/entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(AdminUser, 'edunori_user') // ? match your admin DB connection name
    private readonly adminRepo: Repository<AdminUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET') || 'default_jwt_secret',
    });
  }

  async validate(payload: { id: string; email: string }) {
    const admin = await this.adminRepo.findOne({
      where: { id: Number(payload.id) },
    });

    if (!admin) {
      throw new UnauthorizedException('Admin no longer exists');
    }
    // The return value becomes req.user
    return {
      uid: payload.id,
      email: payload.email,
    };
  }
}
