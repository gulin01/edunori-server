// interest.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InterestField } from './entities/interest-field.entity';

import { CreateInterestDto } from './dto/create-interest.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(InterestField)
    private interestRepo: Repository<InterestField>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateInterestDto) {
    const interest = this.interestRepo.create(dto);
    return this.interestRepo.save(interest);
  }

  async saveUserInterests(userId: string, interestIds: number[]) {
    const user = await this.userRepo.findOne({
      where: { uid: userId },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException(`User with uid ${userId} not found`);
    }

    const interests = await this.interestRepo.findBy({
      id: In(interestIds),
    });
    user.interests = interests;
    return this.userRepo.save(user);
  }

  async getUserInterests(userId: string) {
    const user = await this.userRepo.findOne({
      where: { uid: userId },
      relations: ['interests'],
    });

    return user?.interests ?? [];
  }
}
