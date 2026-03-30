import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Project } from './entities/project.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: EntityRepository<Tenant>,
    private readonly em: EntityManager
  ) {}

  async create(createProjectDto: { name: string; description?: string }, tenantId: string) {
    const tenant = await this.tenantRepository.findOneOrFail(tenantId);
    
    const project = this.projectRepository.create({
      ...createProjectDto,
      tenant,
    });

    await this.em.persistAndFlush(project);
    return project;
  }

  async findAll() {
    // The TenantInterceptor will automatically apply the 'tenant' filter
    return this.projectRepository.findAll();
  }

  async findOne(id: string) {
    return this.projectRepository.findOneOrFail(id);
  }
}
