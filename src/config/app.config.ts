import { ConfigService, registerAs } from '@nestjs/config';
const configService = new ConfigService();

export default registerAs('app', () => ({
  environment: configService.get('NODE_ENV'),
  port: parseInt(configService.get('PORT'), 10) || 4000,
  portSocket: parseInt(configService.get('PORT_SOCKET'), 10) || 4001,
}));
