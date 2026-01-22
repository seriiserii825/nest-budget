import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ApiUserResponse } from 'src/common/decorators/api-user-response.decorator';
import {
  LoginResponseDto,
  LogoutResponseDto,
  UserResponseWithoutPasswordDto,
} from 'src/user/dto/user-response-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
import type {
  IRequestWithUser,
  IUserFromJwt,
} from './interfaces/IRequestWithUser';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

interface RequestWithUser extends Request {
  user: UserResponseWithoutPasswordDto;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiUserResponse()
  @Post('register')
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseWithoutPasswordDto> {
    return this.authService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: CreateAuthDto })
  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login')
  login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: LogoutResponseDto })
  @Post('logout')
  logout(@CurrentUser() user: IUserFromJwt) {
    return this.authService.logout(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: IUserFromJwt) {
    return user;
  }
}
