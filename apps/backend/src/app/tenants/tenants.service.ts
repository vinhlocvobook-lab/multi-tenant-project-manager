import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: EntityRepository<Tenant>,
    private readonly em: EntityManager
  ) {}

  async create(createTenantDto: { name: string; slug: string }) {
    const existing = await this.tenantRepository.findOne({ slug: createTenantDto.slug });
    if (existing) {
      throw new ConflictException(`Tenant with slug "${createTenantDto.slug}" already exists`);
    }

    const tenant = this.tenantRepository.create({
      ...createTenantDto,
      dbConfig: { type: 'shared' },
    });

    await this.em.persist(tenant).flush();
    return tenant;
  }

  async findAll() {
    return this.tenantRepository.findAll();
  }

  async findOne(id: string) {
    return this.tenantRepository.findOneOrFail(id);
  }
}
