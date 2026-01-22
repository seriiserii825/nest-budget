import { ApiProperty } from '@nestjs/swagger';

export class ResponseCategoryDto {
  @ApiProperty({ example: 1, description: 'The ID of the category' })
  id: number;
  @ApiProperty({
    example: 'Groceries',
    description: 'The title of the category',
  })
  title: string;
  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Creation date',
  })
  createdAt: Date;
  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Last update date',
  })
  updatedAt: Date;
}
