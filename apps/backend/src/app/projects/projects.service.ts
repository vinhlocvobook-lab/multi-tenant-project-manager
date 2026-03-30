import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Project } from './entities/project.entity';
import { StatusDefinition } from '../metadata/entities/status-definition.entity';
import { PriorityDefinition } from '../metadata/entities/priority-definition.entity';
import { User } from '../users/entities/user.entity';
import { Department } from '../departments/entities/department.entity';
import { Partner } from '../partners/entities/partner.entity';
import { Tenant } from '../tenants/entities/tenant.entity';
import { EntityType } from '@multi-tenant-project-manager/shared-types';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>,
    @InjectRepository(StatusDefinition)
    private readonly statusRepository: EntityRepository<StatusDefinition>,
    @InjectRepository(PriorityDefinition)
    private readonly priorityRepository: EntityRepository<PriorityDefinition>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Department)
    private readonly departmentRepository: EntityRepository<Department>,
    @InjectRepository(Partner)
    private readonly partnerRepository: EntityRepository<Partner>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: EntityRepository<Tenant>,
    private readonly em: EntityManager
  ) {}

  async create(dto: { 
    name: string; 
    description?: string; 
    statusId?: string;
    priorityId?: string;
    startDate?: Date;
    endDate?: Date;
    leaderIds?: string[];
    departmentIds?: string[];
    clientId?: string;
  }, tenantId: string) {
    const tenant = await this.tenantRepository.findOneOrFail(tenantId);
    
    let status: StatusDefinition | undefined;
    if (dto.statusId) {
      status = await this.statusRepository.findOneOrFail(dto.statusId);
    } else {
      status = await this.statusRepository.findOne({ tenant, type: EntityType.PROJECT, isDefault: true });
    }

    let priority: PriorityDefinition | undefined;
    if (dto.priorityId) {
      priority = await this.priorityRepository.findOneOrFail(dto.priorityId);
    }

    let leaders: User[] = [];
    if (dto.leaderIds?.length) {
      leaders = await this.userRepository.find({ id: { $in: dto.leaderIds } });
    }

    let departments: Department[] = [];
    if (dto.departmentIds?.length) {
      departments = await this.departmentRepository.find({ id: { $in: dto.departmentIds } });
    }

    let client: Partner | undefined;
    if (dto.clientId) {
      client = await this.partnerRepository.findOneOrFail(dto.clientId);
    }

    const project = this.projectRepository.create({
      ...dto,
      tenant,
      status,
      priority,
      leaders,
      departments,
      client,
    });

    await this.em.persistAndFlush(project);
    return project;
  }

  async findAll(tenantId: string) {
    return this.projectRepository.find({ tenant: tenantId }, {
      populate: ['status', 'priority', 'leaders', 'departments', 'client'],
    });
  }

  async findOne(id: string) {
    return this.projectRepository.findOneOrFail(id, {
      populate: ['status', 'priority', 'leaders', 'departments', 'client'],
    });
  }
}
