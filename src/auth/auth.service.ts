import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserResponseWithoutPasswordDto } from 'src/user/dto/user-response-dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { IUserFromJwt } from './interfaces/IRequestWithUser';
import { IUserJwtPayload } from './interfaces/IUserJwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserResponseWithoutPasswordDto> {
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

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseWithoutPasswordDto | null> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }

    const passwordsIsMatch = await argon2.verify(user.password, password);

    if (user && passwordsIsMatch) {
      return user;
    }
    return null;
  }

  async isUserExists(email: string): Promise<boolean> {
    return this.userRepository
      .count({ where: { email } })
      .then((count) => count > 0);
  }

  login(user: UserResponseWithoutPasswordDto) {
    const payload: IUserJwtPayload = { email: user.email, sub: user.id };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  logout(user: IUserFromJwt) {
    return {
      message: `User with email ${user.email} logged out successfully`,
    };
  }
}
