import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { ApiUserResponse } from 'src/common/decorators/api-user-response.decorator';
import { UserResponseWithoutPasswordDto } from 'src/user/dto/user-response-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

interface RequestWithUser extends Request {
  user: UserResponseWithoutPasswordDto;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: CreateUserDto })
  @ApiUserResponse()
  @Post('register')
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseWithoutPasswordDto> {
    return this.authService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestWithUser): UserResponseWithoutPasswordDto {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    // return req.logout();
    return { message: 'Logged out' };
  }
}
