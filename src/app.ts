import express, { type Application } from 'express';
import morgan from 'morgan';
import pino from 'pino-http';
import { IRoute } from '@interfaces';
import { config } from '@config';
import { errorMiddleware } from '@middlewares';

export default class App {
  private app: Application;
  private port: number | string;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.port = config.port || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.handleGlobalErrorHandler();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('====================================');
      console.log(`App listening on the port ${this.port}`);
      console.log('====================================');
    });
  }

  public getServer(): Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan('combined'));
    this.app.use(pino());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private handleGlobalErrorHandler(): void {
    this.app.use(errorMiddleware);
  }

  private initializeRoutes(routes: IRoute[]): void {
    routes.forEach((route) => this.app.use('/api/v1', route.router));
  }
}
