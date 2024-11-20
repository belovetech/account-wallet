import { Router } from 'express';
import { IRoute } from '@interfaces';
import { WalletController } from '@controllers';

export default class WalletRoute implements IRoute {
  public path = '/wallets';
  public router: Router = Router();
  private walletController: WalletController = new WalletController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}/credit`, this.walletController.creditWallet);
    this.router.post(`${this.path}/debit`, this.walletController.debitWallet);
  }
}
