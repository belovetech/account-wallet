import { prisma } from '@datasource';
import { CreateAccount } from '@interfaces';
import { Account } from '@prisma/client';

export default class AccountRepository {
  public async createAccount(account: CreateAccount): Promise<Account> {
    return await prisma.account.create({
      data: {
        email: account.email,
        fullName: account.fullName,
        accountNumber: account.accountNumber!,
      },
    });
  }

  async getAccountByAccountNumber(
    accountNumber: string
  ): Promise<Account | null> {
    return await prisma.account.findUnique({
      where: {
        accountNumber,
      },
    });
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    return await prisma.account.findUnique({
      where: {
        email,
      },
    });
  }
}
