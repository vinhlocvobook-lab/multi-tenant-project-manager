import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { User } from './entities/user.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: EntityRepository<Tenant>,
    private readonly em: EntityManager
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email }, { populate: ['tenant'] });
  }

  async create(userData: { email: string; password: string; fullName: string; tenantId: string }) {
    const existing = await this.userRepository.findOne({ email: userData.email });
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const tenant = await this.tenantRepository.findOne(userData.tenantId);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    const user = new User();
    user.email = userData.email;
    user.fullName = userData.fullName;
    user.tenant = tenant;
    await user.setPassword(userData.password);

    await this.em.persistAndFlush(user);
    return user;
  }
}
