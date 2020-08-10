import { promisify } from 'util';
import { createClient } from 'redis';
import { debug } from 'console';
import { redisHost, redisPort, redisPassword } from '../configs/constant';

const createClientFunction = () => {
  const client = createClient({
    host: redisHost,
    port: Number(redisPort),
    password: redisPassword,
  });

  client.on('ready', () => {
    debug('Connection to Redis succesfull');
  });
  return client;
};
const store = createClientFunction();

export default {
  get: async (key: string) => JSON.parse(await promisify(store.get).bind(store)(key)),
  setex: (key, exp, data) => promisify(store.setex).bind(store)(key, exp, JSON.stringify(data)),
  quit: promisify(store.quit).bind(store),
  client: store,
};
