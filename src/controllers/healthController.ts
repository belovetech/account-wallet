import { type Request, type Response } from 'express';

export default class HealthController {
  public static ping(req: Request, res: Response) {
    req.log.info('healthcheck request received.');
    res.status(200).json({ message: 'I am alive and healthy' });
  }
}
