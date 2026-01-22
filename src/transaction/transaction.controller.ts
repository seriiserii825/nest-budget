import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateTransactionDto,
  TransactionResponseDto,
} from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionService } from './transaction.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { IUserFromJwt } from 'src/auth/interfaces/IRequestWithUser';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOkResponse({ type: TransactionResponseDto })
  @ApiBody({ type: CreateTransactionDto })
  @Post()
  create(
    @CurrentUser() user: IUserFromJwt,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(createTransactionDto, user.userId);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @ApiOkResponse({ type: TransactionResponseDto })
  @Get(':id')
  findOne(@CurrentUser() user: IUserFromJwt, @Param('id') id: string) {
    return this.transactionService.findOne(+id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
