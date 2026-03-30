import { Entity, Property, ManyToOne, ManyToMany, Collection } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { User } from '../../users/entities/user.entity';
import { StatusDefinition } from '../../metadata/entities/status-definition.entity';
import { PriorityDefinition } from '../../metadata/entities/priority-definition.entity';
import { Department } from '../../departments/entities/department.entity';
import { Partner } from '../../partners/entities/partner.entity';

@Entity({ tableName: 'projects' })
export class Project extends BaseTenantEntity {
  @Property()
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => StatusDefinition)
  status!: StatusDefinition;

  @ManyToOne(() => PriorityDefinition)
  priority!: PriorityDefinition;

  @ManyToMany(() => User)
  leaders = new Collection<User>(this);

  @ManyToMany(() => Department)
  departments = new Collection<Department>(this);

  @ManyToOne(() => Partner, { nullable: true })
  client?: Partner;

  @Property({ nullable: true })
  startDate?: Date;

  @Property({ nullable: true })
  endDate?: Date;
}
