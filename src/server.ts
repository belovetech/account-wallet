import App from './app';
import { healthcheckRoute, accountRoute, walletRoute } from './routes';

const app = new App([healthcheckRoute, accountRoute, walletRoute]);
app.listen();
