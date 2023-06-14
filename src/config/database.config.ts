import { registerAs } from '@nestjs/config';

import { config } from 'dotenv';
config();

export default registerAs('postgres', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  certificate: process.env.POSTGRES_SSL_CERT,
}));
