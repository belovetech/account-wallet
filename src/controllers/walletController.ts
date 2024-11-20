import { type Response, type Request, type NextFunction } from 'express';
import { WalletService } from '@services';
import { SuccessResponse } from '@interfaces';
import { walletSchema } from '@validators';
import { BadRequestException } from '@utils';

export default class WalletController {
  public walletService: WalletService;

  constructor() {
    this.walletService = new WalletService();
  }

  public creditWallet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payload = walletSchema.validate(req.body);
      if (payload.error) {
        return next(new BadRequestException(payload.error.message));
      }
      const wallet = await this.walletService.creditWallet(
        payload.value.accountNumber,
        payload.value.amount
      );
      res
        .status(201)
        .json(new SuccessResponse('Wallet credited successfully', wallet));
    } catch (error) {
      return next(error);
    }
  };

  public debitWallet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payload = walletSchema.validate(req.body);
      if (payload.error) {
        return next(new BadRequestException(payload.error.message));
      }
      const wallet = await this.walletService.debitWallet(
        payload.value.accountNumber,
        payload.value.amount
      );
      res
        .status(201)
        .json(new SuccessResponse('Wallet debited successfully', wallet));
    } catch (error) {
      return next(error);
    }
  };
}
