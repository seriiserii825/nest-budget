import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CategoryDto } from 'src/category/dto/create-category.dto';
import { UserResponseDto } from 'src/user/dto/user-response-dto';

enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class TransactionResponseDto {
  @ApiProperty({ example: 1, description: 'The unique' })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'Salary',
    description: 'The title of the transaction',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'income',
    description: 'The type of the transaction, income or expense',
  })
  @IsEnum(TransactionType)
  type: string;

  @ApiProperty({
    example: 5000,
    description: 'The amount of the transaction',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: {
      id: 1,
      username: 'johndoe',
      email: 'user@mail.com',
    },
  })
  user: UserResponseDto;

  @ApiProperty({
    example: 2,
    description: 'The ID of the category associated with the transaction',
  })
  category: CategoryDto;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The creation date of the transaction',
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-02T00:00:00Z',
    description: 'The last update date of the transaction',
  })
  @IsString()
  updatedAt: Date;
}

export class TransactionWithoutRelationsDto extends OmitType(
  TransactionResponseDto,
  ['user', 'category'] as const,
) {}

export class CreateTransactionDto {
  @ApiProperty({
    example: 'Salary',
    description: 'The title of the transaction',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'income',
    description: 'The type of the transaction, income or expense',
  })
  @IsEnum(TransactionType)
  type: string;

  @ApiProperty({
    example: 5000,
    description: 'The amount of the transaction',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the category associated with the transaction',
  })
  @IsNumber()
  category: number;
}

class PaginationMetaDto {
  @ApiProperty({ example: 1, description: 'Current page number' })
  @IsNumber()
  page: number;

  @ApiProperty({ example: 10, description: 'Number of items per page' })
  @IsNumber()
  limit: number;

  @ApiProperty({ example: 100, description: 'Total number of items' })
  @IsNumber()
  total: number;

  @ApiProperty({ example: 10, description: 'Total number of pages' })
  @IsNumber()
  totalPages: number;
}

export class PaginatedTransactionResponseDto {
  @ApiProperty({ type: [TransactionResponseDto] })
  data: TransactionResponseDto[];
  meta: PaginationMetaDto;
}

export class SummaryResponseDto {
  @ApiProperty({ example: 15000, description: 'Total income amount' })
  income: number;

  @ApiProperty({ example: 5000, description: 'Total expense amount' })
  expense: number;
}
