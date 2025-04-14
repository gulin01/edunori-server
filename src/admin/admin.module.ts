// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminUser } from './entities/admin.entity';
import { AdminJwtStrategy } from 'src/auth/strategies/admin-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser], 'edunori_user'),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AdminService, AdminJwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
