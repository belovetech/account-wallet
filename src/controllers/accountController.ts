import { type Response, type Request, type NextFunction } from 'express';
import { AccountService } from '@services';
import { SuccessResponse } from '@interfaces';
import { accountSchema } from '@validators';
import { BadRequestException } from '@utils';

export default class AccountController {
  public accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  public createAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payload = accountSchema.validate(req.body);
      if (payload.error) {
        return next(new BadRequestException(payload.error.message));
      }
      const account = await this.accountService.createAccount(payload.value);
      res
        .status(201)
        .json(new SuccessResponse('Account created successfully', account));
    } catch (error) {
      return next(error);
    }
  };
}
