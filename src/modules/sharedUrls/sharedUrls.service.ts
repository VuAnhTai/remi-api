import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SharedUrl } from './sharedUrl.entity';

@Injectable()
export class SharedUrlsService {
  constructor(
    @InjectRepository(SharedUrl)
    private sharedUrlRepository: Repository<SharedUrl>
  ) {}

  async create(data: SharedUrl) {
    return this.sharedUrlRepository.save({
      ...data,
    });
  }

  async findAll() {
    return this.sharedUrlRepository.find({
      relations: ['user'],
    });
  }
}
