import { CreateAccount } from '@interfaces';
import { Account } from '@prisma/client';
import { AccountRepository, WalletRepository } from '@repositories';
import { ConflictException, generateAccountNumber } from '@utils';

export default class AccountService {
  private accountRepository: AccountRepository;
  private walletRepository: WalletRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.walletRepository = new WalletRepository();
  }

  public async createAccount(account: CreateAccount): Promise<Account> {
    const accountExist = await this.accountRepository.getAccountByEmail(
      account.email
    );

    if (accountExist) {
      throw new ConflictException('Account with this email already exist');
    }

    const newAccountNumber = generateAccountNumber();
    account.accountNumber = newAccountNumber;
    const newAccount = await this.accountRepository.createAccount(account);
    await this.walletRepository.createWallet(newAccount.id);

    return newAccount;
  }
}
