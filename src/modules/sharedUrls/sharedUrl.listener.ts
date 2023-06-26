import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { SharedUrl } from './sharedUrl.entity';
import { ClsService } from 'nestjs-cls';
import { KEY_CLS } from '@/common/constants';

@EventSubscriber()
export class SharedUrlSubscriber implements EntitySubscriberInterface<SharedUrl> {
  constructor(dataSource: DataSource, private readonly cls: ClsService) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return SharedUrl;
  }
  beforeInsert(event: InsertEvent<SharedUrl>) {
    const user = this.cls.get(KEY_CLS.USER);
    event.entity.createdBy = user.id;
    event.entity.user = {
      id: user.id,
      email: user.email,
    };
  }

  beforeUpdate(event: UpdateEvent<SharedUrl>) {
    event.entity.updatedBy = this.cls.get(KEY_CLS.USER).sub;
  }
}
