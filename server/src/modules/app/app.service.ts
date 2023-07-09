import { Injectable } from '@nestjs/common';
import { NestSession } from 'src/models/NestSession';

@Injectable()
export class AppService {
  home(session: NestSession) {
    const response: Record<string, any> = {
      message: 'Welcome to the API!',
    };

    if (session.user) {
      const user = session.user;

      response.user = user;
    }

    return response;
  }
}
