import { Module } from '@nestjs/common';
import { ConfigModule } from '../_core/config/config.module';
import { AuthModule } from '../auth/auth.module';

import { CategoryModule } from 'src/category/category.module';
import { OrderModule } from 'src/order/order.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { ProductModule } from 'src/product/product.module';
import { ReviewModule } from 'src/review/review.module';
import { StatisticsModule } from 'src/statistics/statistics.module';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';


@Module({
  imports: [
    UserModule,
    AuthModule,
    CategoryModule,
    ReviewModule,
    StatisticsModule,
    PaginationModule,
    OrderModule,
    ProductModule,
    ConfigModule,
  ],
  controllers: [AppController],
})

export class AppModule {};
