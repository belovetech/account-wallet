import Joi from 'joi';

export const accountSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
});
