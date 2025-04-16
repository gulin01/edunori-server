// src/keyedu/keyedu.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyEduCategory } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([KeyEduCategory], 'keyedu_connection'), // <-- here!
  ],
  exports: [TypeOrmModule], // so you can use it in other modules
})
export class CategoryModule {}
