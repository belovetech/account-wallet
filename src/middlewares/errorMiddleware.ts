import { type Request, type Response, type NextFunction } from 'express';
import { Exception } from '@utils/exceptions';

export function errorMiddleware(
  err: Exception,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode: number = err.status || 500;
  const message: string = err.message;
  if (statusCode == 500) {
    res
      .status(statusCode)
      .json({ statusCode, message: 'something went wrong' });
  }

  res.status(statusCode).json({ statusCode, message });
}
