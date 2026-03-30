import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Department } from './entities/department.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Department, User])],
  providers: [],
  controllers: [],
  exports: [],
})
export class DepartmentsModule {}
