import { TypeOrmModule } from '@nestjs/typeorm';
import { kUser } from './kuser.entity';
import { kUserService } from './kuser.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([kUser])],
  providers: [kUserService],
  exports: [kUserService],
})
export class KeyEduModule {}
