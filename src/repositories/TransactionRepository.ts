import { prisma } from '@datasource';
import { CreateTransaction } from '@interfaces';
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@prisma/client';

export default class TransactionRepository {
  async createTransaction(
    transaction: CreateTransaction
  ): Promise<Transaction> {
    return await prisma.transaction.create({
      data: {
        amount: transaction.amount,
        description: transaction.description || '',
        type: this.formatTransactionType(transaction.type),
        status: transaction.status,
        walletId: transaction.walletId,
      },
    });
  }

  async updateTransactionStatus(
    transactionid: string,
    status: string
  ): Promise<Transaction> {
    return await prisma.transaction.update({
      where: {
        id: transactionid,
      },
      data: {
        status: this.formatTransactionStatus(status),
      },
    });
  }

  private formatTransactionType(type: string) {
    switch (type) {
      case 'credit':
        return TransactionType.credit;
      case 'debit':
        return TransactionType.debit;
      default:
        throw new Error('Invalid transaction type');
    }
  }

  private formatTransactionStatus(status: string) {
    switch (status) {
      case 'pending':
        return TransactionStatus.pending;
      case 'completed':
        return TransactionStatus.completed;
      case 'failed':
        return TransactionStatus.failed;
      default:
        throw new Error('Invalid transaction status');
    }
  }
}
