import { Base } from '@/modules/base/base.entity';
import { User } from '@/modules/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SharedUrl extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpatetAt: Date;

  @ManyToOne(() => User, (user: User) => user.urls)
  user: Partial<User>;
}

export type BaseSharedUrl = Pick<SharedUrl, 'url' | 'title' | 'description'>;
