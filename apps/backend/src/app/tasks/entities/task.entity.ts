import { Entity, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { Partner } from '../../partners/entities/partner.entity';
import { StatusDefinition } from '../../metadata/entities/status-definition.entity';
import { PriorityDefinition } from '../../metadata/entities/priority-definition.entity';

@Entity({ tableName: 'tasks' })
export class Task extends BaseTenantEntity {
  @Property()
  title!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => StatusDefinition)
  status!: StatusDefinition;

  @ManyToOne(() => PriorityDefinition)
  priority!: PriorityDefinition;

  @ManyToOne(() => Project, { nullable: true })
  project?: Project;

  @ManyToOne(() => Partner, { nullable: true })
  client?: Partner;

  @ManyToOne(() => User, { nullable: true })
  assignee?: User;

  @ManyToOne(() => Task, { nullable: true })
  parentTask?: Task;

  @OneToMany(() => Task, (task) => task.parentTask)
  subTasks = new Collection<Task>(this);

  @Property({ nullable: true })
  dueDate?: Date;
}
