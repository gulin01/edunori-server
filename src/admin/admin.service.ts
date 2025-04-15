import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminUser } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminUser, 'edunori_connection')
    private readonly adminRepo: Repository<AdminUser>,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: Partial<AdminUser>) {
    if (!data.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const admin = this.adminRepo.create({
      ...data,
      password: hashedPassword,
    });
    return this.adminRepo.save(admin);
  }

  async validateAndLogin(email: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      id: admin.id,
      email: admin.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return this.adminRepo.findOne({ where: { email } });
  }
}
