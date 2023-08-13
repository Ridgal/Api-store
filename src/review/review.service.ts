import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { returnReviewObject } from './return-review.object';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: returnReviewObject
    });
  };

  async create(userId: number, dto: ReviewDto, productId: number) {
    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId
          }
        },
        user: {
          connect: {
            id: userId
          }
        },
      },
    });
  };


  async getAverageValueProductId(productId: number) {
    return this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true }
    })
    .then(data => data._avg)
  }

};
