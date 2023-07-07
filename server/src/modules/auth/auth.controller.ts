import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { NestSession } from 'src/models/NestSession';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  public async token(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    return this.authService.generateToken(email);
  }

  @Post('login')
  public async login(
    @Body('email') email: string,
    @Body('authToken') authToken: string,
    @Session() session: NestSession,
  ) {
    if (session.user) {
      return {
        message: 'User already logged in.',
      };
    }

    if (!email || !authToken) {
      throw new BadRequestException('Email and token are required');
    }

    const user = await this.authService.login(email, authToken);

    if (!user) {
      throw new BadRequestException('An error occurred while logging in.');
    }

    session.user = user;

    return {
      message: 'User logged in.',
    };
  }

  @Post('register')
  public async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Get('logout')
  public async logout() {
    return {
      logout: 'logout',
    };
  }
}
