import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Base {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpatetAt: Date;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;
}
