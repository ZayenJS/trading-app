import { Session } from 'express-session';
import { AppUser } from './User';

export interface NestSession extends Session {
  user?: Omit<AppUser, 'authToken' | 'authTokenExpires' | 'safe'>;
}
