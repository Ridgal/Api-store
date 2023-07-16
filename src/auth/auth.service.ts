import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { AuthDto } from './dto/auth.dto';
import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (existUser) {
      throw new BadRequestException('Пользователь уже существует!')
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.person.firstName(),
        phone: faker.phone.number('+7 ###-##-##'),
        password: await bcrypt.hash(dto.password, 10)
      }
    });

    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens
    };
  }

  private async issueTokens(userId: number) {
    const data = {id: userId}

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken }
  };

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    }
  };
}
