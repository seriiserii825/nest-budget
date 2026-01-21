import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>> {
    const user_exists = await this.isUserExists(createUserDto.email);
    if (user_exists) {
      throw new ConflictException('User with this email already exists');
    }
    const user = this.userRepository.create({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    });
    await this.userRepository.save(user);
    // return user without password
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async isUserExists(email: string): Promise<boolean> {
    return this.userRepository
      .count({ where: { email } })
      .then((count) => count > 0);
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
