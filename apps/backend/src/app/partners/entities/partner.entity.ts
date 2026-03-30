import { Entity, Property, Enum } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { PartnerType } from '@multi-tenant-project-manager/shared-types';

@Entity({ tableName: 'partners' })
export class Partner extends BaseTenantEntity {
  @Property()
  name!: string;

  @Enum(() => PartnerType)
  type: PartnerType = PartnerType.CLIENT;

  @Property({ nullable: true })
  contactEmail?: string;

  @Property({ nullable: true })
  phone?: string;
}
