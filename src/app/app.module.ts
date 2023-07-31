import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../_core/config/config.module';
// import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule,
    // ConfigModule.forRoot()
  ],
  controllers: [AppController],
})

export class AppModule {};
