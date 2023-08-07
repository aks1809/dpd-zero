import { config } from 'dotenv';

config();

const network = {
  PORT: process.env.PORT || 9000,

  JWT_EXPIRATION: process.env.JWT_EXPIRATION,

  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_DOMAIN: process.env.DB_DOMAIN,

  REDIS_ENDPOINT: process.env.REDIS_ENDPOINT,
  REDIS_PORT: process.env.REDIS_PORT,
};

export default network;
