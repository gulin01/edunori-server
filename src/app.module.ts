import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { TossModule } from './toss/toss.module';
import { MovieModule } from './movie/movie.module';
import { OrdersModule } from './order/order.module';
import { LectureModule } from './lecture/lecture.module';
import { GoodsModule } from './goods/goods.module';
import { BasketModule } from './basket/basket.module';
import { ProductModule } from './product/product.module';

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
          charset: 'utf8mb4', // ?�� This matters!
        };
      },
    }),
    AuthModule,
    TossModule,
    MovieModule,
    OrdersModule,
    LectureModule,
    GoodsModule,
    BasketModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
