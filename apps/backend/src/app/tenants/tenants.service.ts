import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Tenant } from './entities/tenant.entity';
import { MetadataService } from '../metadata/metadata.service';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: EntityRepository<Tenant>,
    private readonly em: EntityManager,
    private readonly metadataService: MetadataService,
  ) {}

  async create(createTenantDto: { name: string; slug: string }) {
    return await this.em.transactional(async (em) => {
      const existing = await em.findOne(Tenant, { slug: createTenantDto.slug });
      if (existing) {
        throw new ConflictException(`Tenant with slug "${createTenantDto.slug}" already exists`);
      }

      const tenant = em.create(Tenant, {
        ...createTenantDto,
        dbConfig: { type: 'shared' },
      });

      await em.persist(tenant).flush();

      // Provision default workflow (Statuses, Priorities)
      await this.metadataService.createDefaultMetadata(tenant.id);

      return tenant;
    });
  }

  async findAll() {
    return this.tenantRepository.findAll();
  }

  async findOne(id: string) {
    return this.tenantRepository.findOneOrFail(id);
  }
}
