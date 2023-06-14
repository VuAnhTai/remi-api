import { ConfigService, registerAs } from '@nestjs/config';
const configService = new ConfigService();

export default registerAs('auth', () => ({
  jwtSecret: configService.get('JWT_SECRET'),
  jwtExpiryTime: configService.get('JWT_EXPIRY_TIME'),
}));
