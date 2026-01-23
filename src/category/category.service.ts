import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CategoryDto,
  CategoryWithRelationsDto,
  CreateCategoryDto,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: number,
  ): Promise<CategoryDto> {
    await this.categoryWithTitleExists(userId, createCategoryDto.title);
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      user: { id: userId },
    });
    return this.categoryRepository.save(category);
  }

  findAll(userId: number): Promise<CategoryDto[]> {
    return this.categoryRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findAllWithTransactions(
    userId: number,
  ): Promise<CategoryWithRelationsDto[]> {
    return this.categoryRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['transaction'],
    });
  }

  async findOne(id: number, user_id: number): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({
      where: { id, user: { id: user_id } },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    user_id: number,
  ): Promise<CategoryDto> {
    if (updateCategoryDto.title) {
      await this.findOne(id, user_id);
      await this.categoryWithTitleExists(user_id, updateCategoryDto.title);
      const category = await this.categoryRepository.preload({
        id,
        ...updateCategoryDto,
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return this.categoryRepository.save(category);
    }
    return this.findOne(id, user_id);
  }

  async remove(id: number, user_id: number): Promise<CategoryDto> {
    const category = await this.findOne(id, user_id);
    await this.categoryRepository.delete(id);
    return category;
  }

  async categoryWithTitleExists(user_id: number, title: string): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: {
        user: {
          id: user_id,
        },
        title,
      },
    });
    if (category) {
      throw new ConflictException('Category with this title already exists');
    }
  }
}
