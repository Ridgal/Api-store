import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { EnumProductSort, GetAllProductDto } from './dto/get-all.products.dto';
import { ProductDto } from './dto/product.dto';
import { returnProductObject, returnProductObjectFullest } from './return-product.object';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async getAll(dto: GetAllProductDto= {}) {
    const { sort, searchTeam } = dto;
    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductSort.LOW_PRICE) {
      prismaSort.push({ price: 'asc' })
    } else if (sort === EnumProductSort.HIGH_PRICE) {
      prismaSort.push({ price: 'desc' })
    } else if (sort === EnumProductSort.OLDEST) {
      prismaSort.push({ createdAt: 'asc' })
    } else prismaSort.push({ createdAt: 'desc' })

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTeam ? {
      OR: [
        {
          category: {
            name: {
              contains: searchTeam,
              mode: 'insensitive',
            }
          },
        },
        {
          name: {
            contains: searchTeam,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchTeam,
            mode: 'insensitive',
          },
        }
      ]
    } : {};

    const { perPage, skip } = this.paginationService.getPagination(dto);

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
    });

    return {
      products,
      length: await this.prisma.product.count({
        where: prismaSearchTermFilter
      }),
    };
  };

  async byId(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id
      },
      select: returnProductObjectFullest
    });

    if (!product) {
      throw new Error('Категория не найдена!')
    }

    return product;
  };

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug
      },
      select: returnProductObjectFullest
    });

    if (!product) {
      throw new NotFoundException('Категория не найдена!')
    }

    return product;
  };

  async byCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: returnProductObjectFullest
    });

    if (!products) {
      throw new NotFoundException('Категория не найдена!')
    }

    return products;
  };

  async getSimilar(id: number) {

    const currentProduct = await this.byId(id);

    if (!!currentProduct) {
      throw new NotFoundException('Current product not found')
    }

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name
        },
        NOT: {
          id: currentProduct.id
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: returnProductObject
    });

    return products;
  };

  async create() {
    const product = await this.prisma.product.create({
      data: {
        description: '',
        name: '',
        price: 0,
        slug: '',
      },
    });

    return product.id;
  };

  async update(id: number, dto: ProductDto) {
    const { description, images, price, name, categoryId } = dto;

    return this.prisma.product.update({
      where: {
        id
      },
      data: {
        description,
        images,
        price,
        name,
        slug: faker.helpers.slugify(dto.name).toLowerCase(),
        category: {
          connect: {
            id: categoryId
          },
        },
      },
    });
  };

  async delete(id: number) {
    return this.prisma.category.delete({ where: { id } });
  };

};
