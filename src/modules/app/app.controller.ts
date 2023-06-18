import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get('')
  async findAll() {
    return 'API is running';
  }
}
