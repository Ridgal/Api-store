import { Controller, Body, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import { ROUTER } from 'src/_core/router';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(ROUTER.AUTH.REGISTRATION)
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  };

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(ROUTER.AUTH.LOGIN)
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  };

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(ROUTER.AUTH.REFRESH)
  async getNewToken(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewToken(dto);
  };
};
