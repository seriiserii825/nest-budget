// src/common/decorators/api-user-response.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/user-response-dto';

export function ApiUserResponse() {
  return applyDecorators(ApiOkResponse({ type: UserResponseDto }));
}
