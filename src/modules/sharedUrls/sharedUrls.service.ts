import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SharedUrl } from './sharedUrl.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT } from '@/common/constants';

@Injectable()
export class SharedUrlsService {
  constructor(
    @InjectRepository(SharedUrl)
    private sharedUrlRepository: Repository<SharedUrl>,
    private eventEmitter: EventEmitter2
  ) {}

  async create(data: SharedUrl) {
    const result = await this.sharedUrlRepository.save({
      ...data,
    });

    this.eventEmitter.emit(EVENT.SHARED_URL.CREATED, result);

    return data;
  }

  async findAll() {
    return this.sharedUrlRepository.find({
      relations: ['user'],
    });
  }
}
