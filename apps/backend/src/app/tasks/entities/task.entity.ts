import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'tasks' })
export class Task extends BaseTenantEntity {
  @Property()
  title!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ default: 'todo' })
  status: 'todo' | 'in-progress' | 'review' | 'done' = 'todo';

  @Property({ default: 'medium' })
  priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium';

  @ManyToOne(() => Project)
  project!: Project;

  @Property({ persist: false })
  get projectId(): string {
    return this.project.id;
  }

  @ManyToOne(() => User, { nullable: true })
  assignee?: User;

  @Property({ nullable: true })
  dueDate?: Date;
}
