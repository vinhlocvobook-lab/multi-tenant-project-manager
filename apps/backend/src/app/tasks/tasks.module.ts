import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Task } from './entities/task.entity';
import { TaskComment } from './entities/task-comment.entity';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { StatusDefinition } from '../metadata/entities/status-definition.entity';
import { PriorityDefinition } from '../metadata/entities/priority-definition.entity';
import { Partner } from '../partners/entities/partner.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Task,
      TaskComment,
      Project,
      User,
      Tenant,
      StatusDefinition,
      PriorityDefinition,
      Partner,
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
