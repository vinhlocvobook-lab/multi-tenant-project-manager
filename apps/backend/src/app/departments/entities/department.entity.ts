import { Entity, Property, ManyToMany, Collection } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'departments' })
export class Department extends BaseTenantEntity {
  @Property()
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => User)
  leaders = new Collection<User>(this);
}
