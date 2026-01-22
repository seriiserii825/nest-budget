import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto, CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { IUserFromJwt } from 'src/auth/interfaces/IRequestWithUser';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({ type: CategoryDto })
  @ApiBody({ type: CreateCategoryDto })
  @Post()
  create(
    @CurrentUser() user: IUserFromJwt,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.create(createCategoryDto, user.userId);
  }

  @ApiOkResponse({ type: [CategoryDto] })
  @Get()
  findAll(@CurrentUser() user: IUserFromJwt): Promise<CategoryDto[]> {
    return this.categoryService.findAll(user.userId);
  }

  @ApiOkResponse({ type: CategoryDto })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoryService.findOne(+id);
  }

  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({ type: CategoryDto })
  @Patch(':id')
  update(
    @CurrentUser() user: IUserFromJwt,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.update(+id, updateCategoryDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
