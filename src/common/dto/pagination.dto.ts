// pagination-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    example: 1,
    description: 'Page number',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page?: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Items per page',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number = 10;
}
