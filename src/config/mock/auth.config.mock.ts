import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: 'ba7b0fda2d6ca649ed5ce1f6cd47da2e7609c3915944608b35d79d5450fca62a8526b2e0e858d6a5',
  jwtExpiryTime: '30d',
}));
