import * as crypto from 'crypto';
import { ERROR_MESSAGE } from '../../constants';
import { BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export interface TokenData {
  token: string;
  expires: Date;
}

export interface TokenError {
  date: string;
  token: string;
}

export class Token {
  private _token = '';
  private _expires: Date = new Date();
  private _errors: TokenError = {
    date: '',
    token: '',
  };

  public constructor(data?: TokenData) {
    if (data) {
      this._token = data.token;
      this._expires = data.expires;
    }
  }

  public generateToken(email: string): string {
    const token = crypto
      .createHash('sha256')
      .update(
        email +
          new Date().getTime() +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
      )
      .digest('hex');

    this.setToken(token);
    this.setExpirationDate(new Date(new Date().getTime() + 600000));

    return this._token;
  }

  public getToken(): string {
    return this._token;
  }

  public getExpirationDate(): Date {
    return this._expires;
  }

  public setToken(token: string): void {
    this._token = token;
  }

  public setExpirationDate(expires: Date): void {
    this._expires = expires;
  }

  public async validateToken(
    email: string,
    prisma: PrismaClient,
  ): Promise<boolean | void> {
    if (!this.getToken()) {
      throw new BadRequestException(ERROR_MESSAGE.MISSING_TOKEN);
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return false;
    }

    const isRightToken = user.authToken === this.getToken();

    if (!isRightToken) {
      this._errors.token = ERROR_MESSAGE.INVALID_TOKEN;
    }

    const isExpired =
      user.authTokenExpires && user.authTokenExpires < new Date();

    if (isExpired) {
      this._errors.date = ERROR_MESSAGE.TOKEN_EXPIRED;
    }

    return isRightToken && !isExpired;
  }

  public getErrors() {
    return this._errors;
  }
}
