import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'edunori_connection')],
  providers: [UserService],
  exports: [UserService], // <-- so other modules (like AuthModule) can use it
})
export class UserModule {}
