import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  environment: 'test',
  port: 4000,
  portSocket: 4001,
}));
