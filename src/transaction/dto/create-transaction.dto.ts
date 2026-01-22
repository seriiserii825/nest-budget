import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

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
    example: 1,
    description: 'The ID of the user associated with the transaction',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'The ID of the category associated with the transaction',
  })
  @IsNumber()
  categoryId: number;

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

export class CreateTransactionDto extends PickType(TransactionResponseDto, [
  'title',
  'type',
  'amount',
  'categoryId',
] as const) {}
