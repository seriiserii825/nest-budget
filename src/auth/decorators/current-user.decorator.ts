import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestWithUser } from '../interfaces/IRequestWithUser';
import { IUserFromJwt } from '../interfaces/IRequestWithUser'; // или где он у вас

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUserFromJwt => {
    const request = ctx.switchToHttp().getRequest<IRequestWithUser>();
    return request.user;
  },
);
