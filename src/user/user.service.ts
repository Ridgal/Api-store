import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { returnUserObject } from './return-user.object';
import { UserDto } from './dto/user.dto';

import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number, selectObject: Prisma.UserSelect = {} ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true
          }
        },
        ...selectObject
      }
    })

    if (!user) {
      throw new Error('Пользователь не найден!')
    }

    return user;
  };

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (isSameUser && id !== isSameUser.id) {
      throw new BadRequestException('Email already in use')
    }

    const user = await this.byId(id);

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        email: dto.email,
        password: dto.password ? await bcrypt.hash(dto.password, 10) : user.password,
        name: dto.name,
        phone: dto.phone,
      }
    });
  };

  async toggleFavorite(userId: number, productId: number) {
    const user = await this.byId(userId);

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    const isExist = user.favorites.some(product =>
      product.id === productId);

    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        favorites: {
          [isExist ? 'disconnect' : 'connect']: {
            id: productId
          }
        }
      }
    });

    return { message: 'Success' };
  };
};
