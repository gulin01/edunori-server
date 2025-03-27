// STEP 4: user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findByKakaoId(kakaoId: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { provider_id: kakaoId } });
  }

  async createWithKakao(data: {
    kakao_no: string;
    email?: string;
    name: string;
    phone_number: string;
    id_provider: string;
  }): Promise<User> {
    const user = this.userRepo.create(data);

    return this.userRepo.save(user);
  }
  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  async updateLoginInfo(user: User): Promise<User> {
    user.last_login = new Date();
    user.login_cnt += 1;
    return await this.userRepo.save(user);
  }

  //key edu으로 로그인시
}

// STEP 5: Add to .env file
// KAKAO_CLIENT_ID=...
// KAKAO_CLIENT_SECRET=...
// KAKAO_CALLBACK_URL=http://localhost:3000/auth/kakao/callback
// JWT_SECRET=your_secret_key

// STEP 6: Add 'refresh_token' field to User entity
// @Column({ nullable: true })
// refresh_token: string;
