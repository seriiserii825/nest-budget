import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    await this.entityWithTitleExists(userId, createTransactionDto.title);
    const transaction = this.transactionRepository.create({
      title: createTransactionDto.title,
      type: createTransactionDto.type,
      amount: createTransactionDto.amount,
      user: { id: userId },
      category: { id: createTransactionDto.categoryId }, // Map categoryId to category object
    });
    return this.transactionRepository.save(transaction);
  }

  findAll() {
    return `This action returns all transaction`;
  }

  async findOne(id: number, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
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
}
