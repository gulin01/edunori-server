// interest.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InterestField } from './entities/interest-field.entity';

import { CreateInterestDto } from './dto/create-interest.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(InterestField, 'edunori_user')
    private interestRepo: Repository<InterestField>,

    @InjectRepository(User, 'edunori_user')
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateInterestDto) {
    const interest = this.interestRepo.create(dto);
    return this.interestRepo.save(interest);
  }
  async saveUserInterests(userId: string, interestIds: number[]) {
    if (!Array.isArray(interestIds) || interestIds.length === 0) {
      throw new BadRequestException('You must select at least one interest.');
    }

    if (interestIds.length > 5) {
      throw new BadRequestException('You can select up to 5 interests only.');
    }

    const user = await this.userRepo.findOne({
      where: { uid: userId },
      relations: ['interests'],
    });

    if (!user) throw new NotFoundException('User not found');

    const selectedInterests = await this.interestRepo.findBy({
      id: In(interestIds),
    });

    user.interests = selectedInterests;
    await this.userRepo.save(user);

    return {
      success: true,
      message: 'Interests updated',
      selectedInterestIds: interestIds,
    };
  }
  async delete(id: number): Promise<{ success: boolean; message: string }> {
    const result = await this.interestRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'Interest deleted successfully',
    };
  }
  async getUserInterests(userId: string) {
    const user = await this.userRepo.findOne({
      where: { uid: userId },
      relations: ['interests'],
    });

    return user?.interests ?? [];
  }

  async getAllInterests() {
    return this.interestRepo.find(); // fetch all interest rows
  }
}
