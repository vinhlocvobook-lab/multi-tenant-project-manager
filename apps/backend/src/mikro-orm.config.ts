import { Options, MariaDbDriver } from '@mikro-orm/mariadb';
import { Migrator } from '@mikro-orm/migrations';
import { ReflectMetadataProvider } from '@mikro-orm/core';
import { Tenant } from './app/tenants/entities/tenant.entity';
import { User } from './app/users/entities/user.entity';
import { Project } from './app/projects/entities/project.entity';
import { Task } from './app/tasks/entities/task.entity';
import { Department } from './app/departments/entities/department.entity';
import { Partner } from './app/partners/entities/partner.entity';
import { TaskComment } from './app/tasks/entities/task-comment.entity';
import { StatusDefinition } from './app/metadata/entities/status-definition.entity';
import { PriorityDefinition } from './app/metadata/entities/priority-definition.entity';
import { Role } from './app/auth/entities/role.entity';
import { Permission } from './app/auth/entities/permission.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Options = {
  driver: MariaDbDriver,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: [
    Tenant,
    User,
    Project,
    Task,
    Department,
    Partner,
    TaskComment,
    StatusDefinition,
    PriorityDefinition,
    Role,
    Permission,
  ],
  metadataProvider: ReflectMetadataProvider,
  extensions: [Migrator],
  migrations: {
    path: 'apps/backend/src/migrations', // Path for CLI (from root)
    pathTs: 'apps/backend/src/migrations',
    disableForeignKeys: true,
  },
  filters: {
    tenant: {
      cond: (args) => ({ tenant: args.tenantId }),
      default: false,
    },
  },
  debug: process.env.NODE_ENV !== 'production',
};

export default config;
