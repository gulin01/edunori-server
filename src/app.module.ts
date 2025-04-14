import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TossModule } from './toss/toss.module';
import { MovieModule } from './movie/movie.module';
import { OrdersModule } from './order/order.module';
import { LectureModule } from './lecture/lecture.module';
import { GoodsModule } from './goods/goods.module';
import { BasketModule } from './basket/basket.module';
import { ProductModule } from './product/product.module';
import { User } from './user/entities/user.entity';
import { kUser } from './keyedu/user/kuser.entity';
import { ProductEntity } from './product/entities/product.entity';
import { OrderEntity } from './order/entities/order.entity';
import { Lecture } from './lecture/entities/lecture.entity';
import { LectureCategory } from './lecture/entities/lecture-category.entity';
import { LectureMixedInfo } from './lecture/entities/lecture-mixed-info.entity';
import { InterestField } from './interest/entities/interest-field.entity';
import { MovieInfoEntity } from './movie/entities/move.entity';
import { TeacherInfo } from './teacher/entity/teacher.entity';
import { Goods } from './goods/entities/goods.entity';
import { OrderGoodsEntity } from './order/entities/ordered-goods.entity';
import { InterestModule } from './interest/interest.module';
import { AdminModule } from './admin/admin.module';
import { AdminUser } from './admin/entities/admin.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ✅ Default DB (e.g., books, lectures, orders, etc.)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('KEYEDU_DB_HOST'),
        port: config.get<number>('KEYEDU_DB_PORT'),
        username: config.get<string>('KEYEDU_DB_USERNAME'),
        password: config.get<string>('KEYEDU_DB_PASSWORD'),
        database: config.get<string>('KEYEDU_DB_DATABASE'), // your main DB (keyedu)
        entities: [
          kUser,
          ProductEntity,
          OrderEntity,
          Lecture,
          LectureCategory,
          LectureMixedInfo,
          MovieInfoEntity,
          TeacherInfo,
          Goods,
          OrderGoodsEntity,
          AdminUser,
        ],
        charset: 'utf8mb4',
        synchronize: false,
        logging: true,
      }),
    }),

    // ✅ Edunori Users DB
    TypeOrmModule.forRootAsync({
      name: 'edunori_user',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('EDUNORI_DB_HOST'),
        port: config.get<number>('EDUNORI_DB_PORT'),
        username: config.get<string>('EDUNORI_DB_USERNAME'),
        password: config.get<string>('EDUNORI_DB_PASSWORD'),
        database: config.get<string>('EDUNORI_DB_DATABASE'), // edunori DB
        entities: [User, InterestField, AdminUser], // or a path to only user-related entities
        charset: 'utf8mb4',
        synchronize: true, // Only for dev; false in production
        logging: true,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
