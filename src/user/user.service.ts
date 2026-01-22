import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<UserResponseDto | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
