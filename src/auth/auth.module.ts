import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PrismaModule } from 'prisma/prisma.module';
import { TokenModule } from '../_utils/token/token.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/_core/config/jwt.config';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
})

export class AuthModule {};
