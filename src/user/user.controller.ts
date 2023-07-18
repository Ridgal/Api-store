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

import { Auth } from 'src/_core/decorators/auth.decorator';
import { ROUTER } from 'src/_core/router';
import { CurrentUser } from 'src/_core/decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get prodile
  // toggleFavorite
  // update profile


  @Get(ROUTER.PATH.PROFILE)
  @Auth()
  async getProfile(@CurrentUser() id: number) {
    return this.userService.byId(id);
  };

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(ROUTER.PATH.PROFILE)
  async getNewToken(@CurrentUser() id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  };

  @Auth()
  @HttpCode(200)
  @Patch(`${ROUTER.PATH.PROFILE}/favorites/productId`)
  async toggleFavorite(@Param('productId') productId: string,
  @CurrentUser('id') id: number) {
    return this.userService.toggleFavorite(id, productId);
  };
}
