import { User } from '@prisma/client';

export class AppUser implements User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  authToken: string | null;
  authTokenExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;

  public constructor(user: User) {
    Object.assign(this, user);
  }

  public safe() {
    const { authToken, authTokenExpires, ...safeUser } = this;
    return safeUser;
  }
}
