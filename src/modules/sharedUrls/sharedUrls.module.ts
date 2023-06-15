import { AuthModule } from '@/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedUrl } from './sharedUrl.entity';
import { SharedUrlsController } from './sharedUrls.controller';
import { SharedUrlsService } from './sharedUrls.service';
import { SharedUrlSubscriber } from './sharedUrl.listener';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SharedUrl])],
  controllers: [SharedUrlsController],
  providers: [SharedUrlsService, SharedUrlSubscriber],
})
export class SharedUrlsModule {}
