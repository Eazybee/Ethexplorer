import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), './server/.env') });
export const port: string | undefined = process.env.PORT;
export const ethNodeProvider: string | undefined = process.env.ETH_NODE_PROVIDER;
export const redisHost: string | undefined = process.env.REDIS_HOST;
export const redisPort: string | undefined = process.env.REDIS_PORT;
export const redisPassword: string | undefined = process.env.REDIS_PASSWORD;
export const sessionExpireTime: string | undefined = process.env.SESSION_TIME;
