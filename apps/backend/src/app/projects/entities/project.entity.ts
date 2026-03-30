import { Entity, Property } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';

@Entity({ tableName: 'projects' })
export class Project extends BaseTenantEntity {
  @Property()
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ default: 'active' })
  status: 'active' | 'archived' | 'completed' = 'active';
}
