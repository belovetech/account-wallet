import { CreateTransaction } from '@interfaces';
import { Transaction } from '@prisma/client';
import { TransactionRepository } from '@repositories';

export default class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async createCreditTransaction(
    transaction: CreateTransaction
  ): Promise<Transaction> {
    return await this.transactionRepository.createTransaction({
      ...transaction,
      type: 'credit',
    });
  }

  async createDebitTransaction(
    transaction: CreateTransaction
  ): Promise<Transaction> {
    return await this.transactionRepository.createTransaction({
      ...transaction,
      type: 'debit',
    });
  }
}
