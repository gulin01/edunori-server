import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { TossModule } from './toss/toss.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const userEntity = User;
        console.log('User entity loaded:', userEntity);

        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity.{ts,js}'],
          synchronize: true,
          charset: 'utf8mb4', // ✅ This matters!
        };
      },
    }),
    AuthModule,
    TossModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
