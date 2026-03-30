import { Entity, Property, Enum } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { EntityType } from '@multi-tenant-project-manager/shared-types';

@Entity({ tableName: 'status_definitions' })
export class StatusDefinition extends BaseTenantEntity {
  @Property()
  name!: string;

  @Property()
  color!: string; // Hex color: #FFFFFF

  @Enum(() => EntityType)
  type!: EntityType;

  @Property({ default: 0 })
  weight: number = 0;

  @Property({ default: false })
  isDefault: boolean = false;
}
