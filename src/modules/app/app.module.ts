import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@/config/config.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { ClsModule } from 'nestjs-cls';
import { SharedUrlsModule } from '../sharedUrls/sharedUrls.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from '../events/events.module';
import { AppController } from './app.controller';

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
    EventEmitterModule.forRoot(),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
