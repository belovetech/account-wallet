import { Account, Wallet } from '@prisma/client';
import { TransactionRepository, WalletRepository } from '@repositories';
import {
  BadRequestException,
  ConflictException,
  NotfoundException,
  UnprocessableException,
} from '@utils';

export default class WalletService {
  private walletRepository: WalletRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.walletRepository = new WalletRepository();
    this.transactionRepository = new TransactionRepository();
  }

  public async creditWallet(
    accountNumber: string,
    amount: number
  ): Promise<Wallet> {
    const wallet = await this.getWalletByAccountNumber(accountNumber);

    if (amount <= 0) {
      throw new BadRequestException('Amount should be greater than zero (0)');
    }

    const updatedBalance = wallet.balance + amount;
    await this.walletRepository.updateWalletBalance(wallet.id, updatedBalance);
    await this.transactionRepository.createTransaction({
      amount,
      description: 'Credit',
      status: 'completed',
      type: 'credit',
      walletId: wallet.id,
    });
    return this.getWalletByAccountNumber(accountNumber);
  }

  public async debitWallet(
    accountNumber: string,
    amount: number
  ): Promise<Wallet> {
    const wallet = await this.getWalletByAccountNumber(accountNumber);

    if (wallet.balance < amount) {
      throw new UnprocessableException('Insufficient balance');
    }

    if (amount <= 0) {
      throw new UnprocessableException(
        'Amount should be greater than zero (0)'
      );
    }

    const updatedBalance = wallet.balance - amount;
    await this.walletRepository.updateWalletBalance(wallet.id, updatedBalance);
    await this.transactionRepository.createTransaction({
      amount,
      description: 'Debit',
      status: 'completed',
      type: 'debit',
      walletId: wallet.id,
    });
    return this.getWalletByAccountNumber(accountNumber);
  }

  async getWalletByAccountNumber(accountNumber: string): Promise<Wallet> {
    const wallet = await this.walletRepository.getWalletByAccountNumber(
      accountNumber
    );

    if (!wallet) {
      throw new NotfoundException('Invalid account number');
    }

    return wallet;
  }
}
