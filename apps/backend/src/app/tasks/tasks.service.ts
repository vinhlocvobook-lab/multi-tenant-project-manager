import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Task } from './entities/task.entity';
import { Project } from '../projects/entities/project.entity';
import { StatusDefinition } from '../metadata/entities/status-definition.entity';
import { PriorityDefinition } from '../metadata/entities/priority-definition.entity';
import { Partner } from '../partners/entities/partner.entity';
import { User } from '../users/entities/user.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { EntityType } from '@multi-tenant-project-manager/shared-types';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: EntityRepository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>,
    @InjectRepository(StatusDefinition)
    private readonly statusRepository: EntityRepository<StatusDefinition>,
    @InjectRepository(PriorityDefinition)
    private readonly priorityRepository: EntityRepository<PriorityDefinition>,
    @InjectRepository(Partner)
    private readonly partnerRepository: EntityRepository<Partner>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: EntityRepository<Tenant>,
    private readonly em: EntityManager
  ) {}

  async create(dto: { 
    title: string; 
    description?: string; 
    projectId?: string; 
    statusId?: string;
    priorityId?: string;
    assigneeId?: string;
    parentTaskId?: string;
    clientId?: string;
  }, tenantId: string) {
    const tenant = await this.tenantRepository.findOneOrFail(tenantId);
    
    let project: Project | undefined;
    if (dto.projectId) {
      project = await this.projectRepository.findOneOrFail(dto.projectId);
    }

    let status: StatusDefinition | undefined;
    if (dto.statusId) {
      status = await this.statusRepository.findOneOrFail(dto.statusId);
    } else {
      // Default task status for tenant
      status = await this.statusRepository.findOne({ tenant, type: EntityType.TASK, isDefault: true });
    }

    let priority: PriorityDefinition | undefined;
    if (dto.priorityId) {
      priority = await this.priorityRepository.findOneOrFail(dto.priorityId);
    }

    let assignee: User | undefined;
    if (dto.assigneeId) {
      assignee = await this.userRepository.findOneOrFail(dto.assigneeId);
    }

    let parentTask: Task | undefined;
    if (dto.parentTaskId) {
      parentTask = await this.taskRepository.findOneOrFail(dto.parentTaskId);
    }

    let client: Partner | undefined;
    if (dto.clientId) {
      client = await this.partnerRepository.findOneOrFail(dto.clientId);
    }

    const task = this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      tenant,
      project,
      status,
      priority,
      assignee,
      parentTask,
      client,
    });

    await this.em.persistAndFlush(task);
    return task;
  }

  async findAll(filters: { projectId?: string; tenantId: string }) {
    const findOptions: any = { tenant: filters.tenantId };
    if (filters.projectId) {
      findOptions.project = filters.projectId;
    }
    return this.taskRepository.find(findOptions, {
      populate: ['status', 'priority', 'assignee', 'project', 'client'],
    });
  }

  async findOne(id: string) {
    return this.taskRepository.findOneOrFail(id);
  }
}
