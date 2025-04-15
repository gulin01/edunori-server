// interest.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { InterestField } from './entities/interest-field.entity';
import { User } from 'src/user/entities/user.entity';
import { CategoryModule } from 'src/keyedu/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InterestField, User], 'edunori_connection'),
    CategoryModule,
  ],
  controllers: [InterestController],
  providers: [InterestService],
})
export class InterestModule {}
