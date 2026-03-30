import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';
import { StatusDefinition } from '../metadata/entities/status-definition.entity';
import { PriorityDefinition } from '../metadata/entities/priority-definition.entity';
import { Department } from '../departments/entities/department.entity';
import { Partner } from '../partners/entities/partner.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Project,
      Tenant,
      User,
      StatusDefinition,
      PriorityDefinition,
      Department,
      Partner,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
