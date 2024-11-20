import Joi from 'joi';

export const walletSchema = Joi.object({
  accountNumber: Joi.string().max(10).required(),
  amount: Joi.number().min(0).required(),
});
