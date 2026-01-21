// src/common/decorators/api-user-response.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { userResponseExample } from 'src/user/examples/user-response.example';

export function ApiUserResponse() {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(User) },
          {
            example: userResponseExample,
          },
        ],
      },
    }),
  );
}
