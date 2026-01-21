// src/common/decorators/api-user-response.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { userResponseExample } from 'src/user/examples/user-response.example';

export function ApiUserResponse() {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        example: userResponseExample,
      },
    }),
  );
}
