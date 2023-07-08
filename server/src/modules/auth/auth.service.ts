import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Mailer } from '../../services/mailer';
import { Token } from '../../services/token';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  public async generateToken(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const token = new Token();
    const tokenValue = token.generateToken(email);
    const tokenExpirationDate = token.getExpirationDate();

    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        authToken: tokenValue,
        authTokenExpires: tokenExpirationDate,
      },
    });

    try {
      const mailer = new Mailer('Trading App <noreply@trading-app.com>', [
        email,
      ]);
      await mailer.sendToken(tokenValue);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error sending email.');
    }

    return {
      message: 'Token sent to email provided.',
    };
  }

  public async register(data: CreateUserDto) {
    const { email, firstName, lastName, username } = data;

    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException('This email is already in use.');
    }

    const newUser = await this.prismaService.user.create({
      data: {
        email,
        firstName,
        lastName,
        userName: username,
      },
    });

    if (!newUser) {
      throw new InternalServerErrorException('Error during user registration.');
    }

    return {
      message: 'User created successfully.',
    };
  }

  public async login(email: string, authToken: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.authToken !== authToken) {
      throw new BadRequestException('Invalid token.');
    }

    if (user.authTokenExpires && user.authTokenExpires < new Date()) {
      throw new BadRequestException('Token expired.');
    }

    // TODO: change user token and token expiration date for prod
    await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        // authToken: null,
        authTokenExpires: null,
      },
    });

    return user;
  }
}
