import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

export interface ITenant {
  id: string;
  name: string;
  slug: string;
  dbConfig?: any;
  createdAt: Date;
  updatedAt: Date;
}

@Entity({ tableName: 'tenants' })
export class Tenant implements ITenant {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  name!: string;

  @Unique()
  @Property()
  slug!: string;

  @Property({ type: 'json', nullable: true })
  dbConfig?: {
    type: 'shared' | 'dedicated';
    connectionString?: string;
  };

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ default: true })
  isActive: boolean = true;
}
