import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Task } from './entities/task.entity';
import { Project } from '../projects/entities/project.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: EntityRepository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: EntityRepository<Tenant>,
    private readonly em: EntityManager
  ) {}

  async create(createTaskDto: { title: string; description?: string; projectId: string }, tenantId: string) {
    const tenant = await this.tenantRepository.findOneOrFail(tenantId);
    
    // Check if project exists (and belongs to tenant)
    const project = await this.projectRepository.findOne(createTaskDto.projectId);
    if (!project) {
        throw new NotFoundException('Project not found');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      tenant,
      project,
    });

    await this.em.persistAndFlush(task);
    return task;
  }

  async findAll(projectId?: string) {
    if (projectId) {
      return this.taskRepository.find({ project: projectId });
    }
    return this.taskRepository.findAll();
  }

  async findOne(id: string) {
    return this.taskRepository.findOneOrFail(id);
  }
}
