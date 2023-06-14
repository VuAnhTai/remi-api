import { Module } from '@nestjs/common';
import { UsersController } from './uses.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { config } from 'dotenv';
import { AuthModule } from '@/auth/auth.module';
config();

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
