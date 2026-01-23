import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTransactionDto,
  PaginatedTransactionResponseDto,
  SummaryResponseDto,
  TransactionResponseDto,
} from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: number,
  ): Promise<TransactionResponseDto> {
    await this.entityWithTitleExists(userId, createTransactionDto.title);
    const transaction = this.transactionRepository.create({
      title: createTransactionDto.title,
      type: createTransactionDto.type,
      amount: createTransactionDto.amount,
      user: { id: userId },
      category: { id: createTransactionDto.categoryId }, // Map categoryId to category object
    });
    const savedTransaction = await this.transactionRepository.save(transaction);
    return {
      ...savedTransaction,
      categoryId: savedTransaction.category.id,
      userId: savedTransaction.user.id,
    };
  }

  async findAll(
    userId: number,
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedTransactionResponseDto> {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [transactions, total] = await this.transactionRepository.findAndCount(
      {
        where: { user: { id: userId } },
        relations: ['user', 'category'],
        skip,
        take: limit,
        order: { createdAt: 'DESC' }, // Optional: order by newest first
      },
    );

    const data = transactions.map((transaction) => ({
      id: transaction.id,
      title: transaction.title,
      type: transaction.type,
      amount: transaction.amount,
      categoryId: transaction.category.id,
      userId: transaction.user.id,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }));

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findRecent(userId: number): Promise<TransactionResponseDto[]> {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user', 'category'],
      take: 3,
      order: { createdAt: 'DESC' },
    });
    return transactions.map((transaction) => ({
      ...transaction,
      categoryId: transaction.category.id,
      userId: transaction.user.id,
    }));
  }

  async findOne(id: number, userId: number): Promise<TransactionResponseDto> {
    const transaction = await this.transactionRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user', 'category'],
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return {
      ...transaction,
      categoryId: transaction.category.id,
      userId: transaction.user.id,
    };
  }

  async entityWithTitleExists(user_id: number, title: string): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: {
        user: {
          id: user_id,
        },
        title,
      },
    });
    if (transaction) {
      throw new ConflictException('Transaction with this title already exists');
    }
  }

  async summary(userId: number): Promise<SummaryResponseDto> {
    const transactions = await this.transactionRepository.find({
      where: { user: { id: userId } },
    });

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
        } else if (transaction.type === 'expense') {
          acc.expense += transaction.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 },
    );

    return summary;
  }
}
