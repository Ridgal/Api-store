import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Put,
  Patch,
  HttpCode,
  Param} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

import { CurrentUser } from 'src/_core/decorators/user.decorator';
import { Auth } from 'src/_core/decorators/auth.decorator';

import { ROUTER } from 'src/_core/router';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(ROUTER.PATH.PROFILE)
  @HttpCode(200)
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id);
  };

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put(ROUTER.PATH.PROFILE)
  async getNewToken(
    @CurrentUser('id') id: number,
    @Body() dto: UserDto
  ) {
    return this.userService.updateProfile(id, dto);
  };

  @HttpCode(200)
  @Auth()
  @Patch(`${ROUTER.PATH.PROFILE}/favorites/:productId`)
  async toggleFavorite(
    @CurrentUser('id') id: number,
    @Param('productId') productId: string
  ) {
    return this.userService.toggleFavorite(id, +productId);
  };
}
