import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ example: 1, description: 'The ID of the category' })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'Groceries',
    description: 'The title of the category',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Creation date',
  })
  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Last update date',
  })
  @IsString()
  @IsNotEmpty()
  updatedAt: Date;
}

export class CreateCategoryDto extends PickType(CategoryDto, [
  'title',
] as const) {}
