import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'test@mail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'User password min 6 characters',
  })
  @MinLength(6)
  @IsString()
  password: string;
}
