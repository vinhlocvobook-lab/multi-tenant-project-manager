import { PrimaryKey, Property, ManyToOne, Filter } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Filter({ name: 'tenant', cond: args => ({ tenant: args.tenantId }), default: false })
export abstract class BaseTenantEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @ManyToOne(() => Tenant)
  tenant!: Tenant;

  @Property({ persist: false })
  get tenantId(): string {
    return this.tenant.id;
  }

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
