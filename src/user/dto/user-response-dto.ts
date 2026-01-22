import { ApiProperty, PickType } from '@nestjs/swagger';

export class UserFullResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@mail.com' })
  email: string;

  @ApiProperty({ example: 'hashed_password_string' })
  password: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-02T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;

  // остальное (password/categories/transactions) — тоже можно оставить,
  // но лучше как DTO, и НЕ обязательно для UserResponseDto
}

export class UserResponseDto extends PickType(UserFullResponseDto, [
  'id',
  'email',
  'password',
  'createdAt',
  'updatedAt',
] as const) {}

export class UserResponseWithoutPasswordDto extends PickType(
  UserFullResponseDto,
  ['id', 'email', 'createdAt', 'updatedAt'] as const,
) {}

export class LoginResponseDto {
  @ApiProperty({ example: 'jwt_token_string' })
  accessToken: string;

  @ApiProperty({ type: UserResponseWithoutPasswordDto })
  user: UserResponseWithoutPasswordDto;
}

export class LogoutResponseDto {
  @ApiProperty({ example: 'Successfully logged out' })
  message: string;
}
