import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Tenant } from '../tenants/entities/tenant.entity';
import { Department } from '../departments/entities/department.entity';
import { Role } from '../auth/entities/role.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, Tenant, Department, Role])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
