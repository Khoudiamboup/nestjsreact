import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() _req: Request) {
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    const user = req.user as any; 
    if (user) {
      return this.authService.login({
        email: user.email,
        password: '', 
      });
    }
    return { error: 'Authentication failed' };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
