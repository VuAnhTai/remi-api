import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const sslConfig = configService.get<string>('postgres.certificate');
        const root = path.resolve(__dirname, '..', '..');
        return {
          type: 'postgres',
          host: configService.get('postgres.host'),
          port: configService.get<number>('postgres.port'),
          username: configService.get('postgres.username'),
          password: configService.get('postgres.password'),
          database: configService.get('postgres.database'),
          timezone: 'UTC',
          entities: [root + '/modules/*/*.entity{.ts,.js}'],
          synchronize: true,
          ssl: sslConfig
            ? {
                ca: Buffer.from(
                  configService.get<string>('postgres.certificate'),
                  'base64'
                ).toString('ascii'),
              }
            : false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
