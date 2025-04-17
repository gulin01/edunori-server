import { KUserModule } from 'src/keyedu/user/kuser.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TossModule } from './toss/toss.module';
import { MovieModule } from './keyedu/movie/movie.module';

import { LectureModule } from './keyedu/lecture/lecture.module';
import { GoodsModule } from './keyedu/goods/goods.module';
import { BasketModule } from './basket/basket.module';
import { User } from './user/entities/user.entity';

import { InterestField } from './interest/entities/interest-field.entity';

import { InterestModule } from './interest/interest.module';
import { AdminModule } from './admin/admin.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { OrdersModule } from './keyedu/order/order.module';
import { ProductModule } from './keyedu/product/product.module';
import { CategoryModule } from './keyedu/category/category.module';
import { KeyeduDatabaseModule } from './keyedu/keyedu-database.module';
import { AdminUser } from './admin/entities/admin.entity';
import { UserInterest } from './user/entities/user-interest.entity';
import { BookModule } from './keyedu/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    // ✅ Keyedu  DB
    KeyeduDatabaseModule,
    // ✅ Edunori Users DB
    TypeOrmModule.forRootAsync({
      name: 'edunori_connection',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('EDUNORI_DB_HOST'),
        port: config.get<number>('EDUNORI_DB_PORT'),
        username: config.get<string>('EDUNORI_DB_USERNAME'),
        password: config.get<string>('EDUNORI_DB_PASSWORD'),
        database: config.get<string>('EDUNORI_DB_DATABASE'), // edunori DB
        entities: [User, InterestField, AdminUser, UserInterest], // or a path to only user-related entities
        charset: 'utf8mb4',
        synchronize: true, // Only for dev; false in production
        migrations: ['src/migrations/*.ts'], // 👈 required for migration:run
      }),
    }),

    // Feature modules
    AuthModule,
    TossModule,
    MovieModule,
    OrdersModule,
    LectureModule,
    GoodsModule,
    BasketModule,
    ProductModule,
    InterestModule,
    AdminModule,
    CategoryModule,
    KUserModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Logs all routes
  }
}
