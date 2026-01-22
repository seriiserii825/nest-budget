// src/auth/interfaces/request-with-user.interface.ts
import { Request } from 'express';

export interface IUserFromJwt {
  userId: number;
  email: string;
}

export interface IRequestWithUser extends Request {
  user: IUserFromJwt;
}
