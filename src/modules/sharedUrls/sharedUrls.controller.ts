import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/modules/auth/guard/auth.guard';
import { SharedUrlsService } from './sharedUrls.service';

@Controller('shared-urls')
export class SharedUrlsController {
  constructor(private sharedUrlsService: SharedUrlsService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async findAll() {
    return await this.sharedUrlsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('')
  async create(@Req() req) {
    return await this.sharedUrlsService.create(req.body);
  }
}
