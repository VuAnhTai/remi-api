import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from 'src/config/config.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { ClsModule } from 'nestjs-cls';
import { SharedUrlsModule } from './sharedUrls/sharedUrls.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    SharedUrlsModule,
    ConfigModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
