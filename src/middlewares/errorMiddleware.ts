import { type Request, type Response, type NextFunction } from 'express';
import { Exception } from '@utils/exceptions';

function errorMiddleware(
  err: Exception,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const statusCode: number = err.status || 500;
    const message: string = err.message;

    console.log(err.message);

    if (statusCode == 500) {
      return res
        .status(statusCode)
        .json({ statusCode, message: 'something went wrong' });
    }

    return res.status(statusCode).json({ statusCode, message });
  } catch (error) {
    return next(error);
  }
}

export default errorMiddleware;
