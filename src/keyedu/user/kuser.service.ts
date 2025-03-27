// STEP 4: user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { kUser } from './kuser.entity';

@Injectable()
export class kUserService {
  constructor(
    @InjectRepository(kUser)
    private readonly kuserRepo: Repository<kUser>,
  ) {}

  async findById(id: string): Promise<kUser | null> {
    return await this.kuserRepo.findOne({ where: { id } });
  }

  async findKeyEduUser(userId: string, hashedPassword: string) {
    return this.kuserRepo
      .createQueryBuilder('user')
      .where('(user.id = :userId OR user.united_id = :userId)', { userId })
      .andWhere('user.password = :hashedPassword', { hashedPassword })
      .andWhere('user.state = :state', { state: 'y' })
      .getOne();
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
