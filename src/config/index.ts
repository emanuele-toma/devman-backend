import 'dotenv/config';

export const CONFIG = {
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',

  MONGO: {
    PORT: Number(process.env.MONGO_PORT) || 27017,
    HOST: process.env.MONGO_HOST || 'localhost',
    USER: process.env.MONGO_USER || 'root',
    PASSWORD: process.env.MONGO_PASS || 'root',
  },
};
