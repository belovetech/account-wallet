import { Router } from 'express';
import { IRoute } from '@interfaces';
import { HealthController } from '@controllers';

export default class HealthRoute implements IRoute {
  public path = '/healthz';
  public router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, HealthController.ping);
  }
}
