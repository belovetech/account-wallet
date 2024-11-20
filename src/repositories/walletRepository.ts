import { prisma } from '@datasource';
import { CreateWallet } from '@interfaces';
import { Account, Wallet } from '@prisma/client';

export default class WalletRepository {
  async createWallet(accountId: string): Promise<Wallet> {
    return await prisma.wallet.create({
      data: {
        accountId,
      },
    });
  }

  async updateWalletBalance(walletId: string, amount: number): Promise<Wallet> {
    return await prisma.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: amount,
      },
    });
  }

  async getWalletByAccountNumber(
    accountNumber: string
  ): Promise<Wallet | null> {
    const accountWallet = await prisma.account.findUnique({
      where: {
        accountNumber,
      },
      include: {
        wallet: true,
      },
    });

    if (!accountWallet) {
      return null;
    }

    return accountWallet.wallet;
  }
}
