import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';

import configuration from 'src/_core/config/configuration';

const config = configuration();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      ignoreExpiration: true,
      secretOrKey: config.auth.jwtAccessSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  };

  async validate({id}: Pick<User, 'id'>) {
    return await this.prisma.user.findUnique({ where: { id: +id } })
  };
};