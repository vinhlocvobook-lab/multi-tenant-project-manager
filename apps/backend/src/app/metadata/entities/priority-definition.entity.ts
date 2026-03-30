import { Entity, Property, Enum } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { EntityType } from '@multi-tenant-project-manager/shared-types';

@Entity({ tableName: 'priority_definitions' })
export class PriorityDefinition extends BaseTenantEntity {
  @Property()
  name!: string;

  @Property()
  color!: string; // Hex color: #FF0000

  @Property({ default: 0 })
  weight: number = 0; // Higher = more urgent

  @Enum(() => EntityType)
  type!: EntityType;
}
