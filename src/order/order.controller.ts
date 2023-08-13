import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/_core/decorators/auth.decorator';
import { CurrentUser } from 'src/_core/decorators/user.decorator';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: number) {
    return this.orderService.getAll(userId)
  };
};
