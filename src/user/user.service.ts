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
    return await this.userRepo.findOne({ where: { uid: id } });
  }

  async update(user: User): Promise<User> {
    return this.userRepo.save(user);
  }
  async findBySocialId(
    socialId: string,
    provider_name: string,
  ): Promise<User | null> {
    return this.userRepo.findOne({
      where: { provider_id: socialId, provider_name },
    });
  }
  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  async updateLoginInfo(user: User) {
    user.last_login = new Date();
    user.login_cnt += 1;
    await this.update(user);
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
