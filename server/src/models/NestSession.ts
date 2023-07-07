import { User } from '@prisma/client';

export interface NestSession {
  user?: User;
}
