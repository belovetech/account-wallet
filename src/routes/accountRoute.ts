import { Router } from 'express';
import { IRoute } from '@interfaces';
import { AccountController } from '@controllers';

export default class AccountRoute implements IRoute {
  public path = '/accounts';
  public router: Router = Router();
  private accountController: AccountController = new AccountController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}`, this.accountController.createAccount);
  }
}
