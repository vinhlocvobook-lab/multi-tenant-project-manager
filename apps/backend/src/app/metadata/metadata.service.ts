import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { StatusDefinition } from './entities/status-definition.entity';
import { PriorityDefinition } from './entities/priority-definition.entity';
import { EntityType } from '@multi-tenant-project-manager/shared-types';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(StatusDefinition)
    private readonly statusRepo: EntityRepository<StatusDefinition>,
    @InjectRepository(PriorityDefinition)
    private readonly priorityRepo: EntityRepository<PriorityDefinition>,
  ) {}

  async findStatuses(tenantId: string, type?: EntityType) {
    const filter: any = { tenant: tenantId };
    if (type) filter.type = type;
    return this.statusRepo.find(filter, { orderBy: { weight: 'ASC' } });
  }

  async findPriorities(tenantId: string, type?: EntityType) {
    const filter: any = { tenant: tenantId };
    if (type) filter.type = type;
    return this.priorityRepo.find(filter, { orderBy: { weight: 'DESC' } });
  }

  // Provisioning helper
  async createDefaultMetadata(tenantId: string) {
    // Project Statuses
    const projectStatuses = [
      { name: 'Planned', color: '#94A3B8', type: EntityType.PROJECT, weight: 1, isDefault: true },
      { name: 'Active', color: '#3B82F6', type: EntityType.PROJECT, weight: 2, isDefault: false },
      { name: 'Completed', color: '#10B981', type: EntityType.PROJECT, weight: 3, isDefault: false },
      { name: 'On Hold', color: '#F59E0B', type: EntityType.PROJECT, weight: 4, isDefault: false },
      { name: 'Cancelled', color: '#EF4444', type: EntityType.PROJECT, weight: 5, isDefault: false },
    ];

    // Task Statuses
    const taskStatuses = [
      { name: 'To Do', color: '#94A3B8', type: EntityType.TASK, weight: 1, isDefault: true },
      { name: 'In Progress', color: '#3B82F6', type: EntityType.TASK, weight: 2, isDefault: false },
      { name: 'Review', color: '#8B5CF6', type: EntityType.TASK, weight: 3, isDefault: false },
      { name: 'Done', color: '#10B981', type: EntityType.TASK, weight: 4, isDefault: false },
    ];

    // Priorities
    const priorities = [
      { name: 'Low', color: '#94A3B8', weight: 1, type: EntityType.TASK },
      { name: 'Medium', color: '#3B82F6', weight: 2, type: EntityType.TASK },
      { name: 'High', color: '#F59E0B', weight: 3, type: EntityType.TASK },
      { name: 'Urgent', color: '#EF4444', weight: 4, type: EntityType.TASK },
      { name: 'Low', color: '#94A3B8', weight: 1, type: EntityType.PROJECT },
      { name: 'Medium', color: '#3B82F6', weight: 2, type: EntityType.PROJECT },
      { name: 'High', color: '#EF4444', weight: 3, type: EntityType.PROJECT },
    ];

    for (const s of projectStatuses) {
      const status = this.statusRepo.create({ ...s, tenant: tenantId });
      this.statusRepo.getEntityManager().persist(status);
    }

    for (const s of taskStatuses) {
      const status = this.statusRepo.create({ ...s, tenant: tenantId });
      this.statusRepo.getEntityManager().persist(status);
    }

    for (const p of priorities) {
      const priority = this.priorityRepo.create({ ...p, tenant: tenantId });
      this.priorityRepo.getEntityManager().persist(priority);
    }

    await this.statusRepo.getEntityManager().flush();
  }
}
