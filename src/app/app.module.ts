import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
// import { ConfigModule } from '../_core/config/config.module';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
})

export class AppModule {};
