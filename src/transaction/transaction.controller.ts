import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { IUserFromJwt } from 'src/auth/interfaces/IRequestWithUser';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import {
  CreateTransactionDto,
  PaginatedTransactionResponseDto,
  TransactionResponseDto,
} from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';

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
  ): Promise<TransactionResponseDto> {
    return this.transactionService.create(createTransactionDto, user.userId);
  }

  @ApiOkResponse({ type: [TransactionResponseDto] })
  @Get()
  findAll(
    @CurrentUser() user: IUserFromJwt,
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedTransactionResponseDto> {
    return this.transactionService.findAll(user.userId, paginationQuery);
  }

  @ApiOkResponse({ type: TransactionResponseDto })
  @Get(':id')
  findOne(
    @CurrentUser() user: IUserFromJwt,
    @Param('id') id: string,
  ): Promise<TransactionResponseDto> {
    return this.transactionService.findOne(+id, user.userId);
  }
}
