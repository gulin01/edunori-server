import { TypeOrmModule } from '@nestjs/typeorm';
import { kUser } from './entities/kuser.entity';
import { kUserService } from './kuser.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([kUser], 'keyedu_connection')],
  providers: [kUserService],
  exports: [kUserService],
})
export class KUserModule {}
