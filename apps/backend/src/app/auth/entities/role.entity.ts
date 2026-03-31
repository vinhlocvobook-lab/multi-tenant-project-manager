import { Entity, Property, ManyToMany, Collection } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { Permission } from './permission.entity';

@Entity({ tableName: 'roles' })
export class Role extends BaseTenantEntity {
  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @ManyToMany(() => Permission)
  permissions = new Collection<Permission>(this);

  @Property({ default: false })
  isSystemRole: boolean = false;
}
