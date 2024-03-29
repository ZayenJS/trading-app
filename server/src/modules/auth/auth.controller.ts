import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { NestSession } from 'src/models/NestSession';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from './auth.guard';

import apiResponse from './doc/api-response';
import apiOperation from './doc/api-operation';
import { LoginDto } from './dto/login-dto';
import { TokenDto } from './dto/token-dto';
import { AppUser } from '../../models/User';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(apiOperation.token)
  @ApiResponse(apiResponse.token[200])
  @ApiResponse(apiResponse.token[400])
  @ApiResponse(apiResponse.token[404])
  @ApiResponse(apiResponse.token[500])
  @Post('token')
  public async token(@Body() body: TokenDto) {
    const { email } = body;
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    return this.authService.generateToken(email);
  }

  @ApiOperation(apiOperation.checkUser)
  @ApiResponse(apiResponse.checkUser[200])
  @ApiResponse(apiResponse.checkUser[401])
  @Get('check-user')
  public checkUser(@Session() session: NestSession) {
    if (!session.user) {
      throw new UnauthorizedException('User is not logged in');
    }

    return {
      message: 'User is logged in',
      user: session.user,
    };
  }

  @ApiOperation(apiOperation.login)
  @ApiResponse(apiResponse.login[200])
  @ApiResponse(apiResponse.login[400])
  @ApiResponse(apiResponse.login[404])
  @Post('login')
  public async login(@Body() body: LoginDto, @Session() session: NestSession) {
    if (session.user) {
      return {
        message: 'User already logged in.',
        user: session.user,
      };
    }

    const { email, authToken } = body;

    if (!email || !authToken) {
      throw new BadRequestException('Email and token are required');
    }

    const user = await this.authService.login(email, authToken);

    if (!user) {
      throw new BadRequestException('An error occurred while logging in.');
    }

    session.user = new AppUser(user).safe();

    return {
      message: 'User logged in.',
      user: session.user,
    };
  }

  @ApiOperation(apiOperation.register)
  @ApiResponse(apiResponse.register[201])
  @ApiResponse(apiResponse.register[400])
  @ApiResponse(apiResponse.register[500])
  @Post('register')
  public async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @UseGuards(LoggedInGuard)
  @ApiOperation(apiOperation.logout)
  @ApiResponse(apiResponse.logout[200])
  @Get('logout')
  public async logout(@Session() session: NestSession) {
    if (!session.user) {
      return {
        message: 'No user logged in.',
      };
    }

    session.user = null;

    return {
      message: 'User logged out.',
    };
  }
}
