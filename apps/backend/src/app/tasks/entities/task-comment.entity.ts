import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { Task } from './task.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'task_comments' })
export class TaskComment extends BaseTenantEntity {
  @Property({ type: 'text' })
  content!: string;

  @ManyToOne(() => Task)
  task!: Task;

  @ManyToOne(() => User)
  author!: User;
}
