import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { debug } from 'console';
import router from './routes';
import redis from './utils/redis';
import { port } from './configs/constant';

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(router);

const serverPort = port || 3000;
const server = app.listen(serverPort, () => debug(`server is listening on ${serverPort}`));

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    await redis.quit();
    debug('HTTP server closed');
  });
});
