import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Tenant } from '../tenants/entities/tenant.entity';
import { Department } from '../departments/entities/department.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, Tenant, Department])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
