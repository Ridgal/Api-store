import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/_core/decorators/auth.decorator';
import { CurrentUser } from 'src/_core/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll()
  };

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Post('leave/:productId')
  async leaveReview(
    @CurrentUser('id') id: number,
    @Body() dto: ReviewDto,
    @Param('productId') productId: string
  ) {
    return this.reviewService.create(id, dto, +productId)
  };
};
