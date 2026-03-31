import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/mariadb';
import config from '../mikro-orm.config';
import { Permission } from '../app/auth/entities/permission.entity';
import { Role } from '../app/auth/entities/role.entity';
import { User } from '../app/users/entities/user.entity';
import { Tenant } from '../app/tenants/entities/tenant.entity';

async function seed() {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  console.log('Seeding Permissions...');
  const perms = [
    { id: 'projects:read', name: 'Xem dự án' },
    { id: 'projects:create', name: 'Tạo dự án' },
    { id: 'projects:update', name: 'Sửa dự án' },
    { id: 'projects:delete', name: 'Xóa dự án' },
    { id: 'tasks:read', name: 'Xem công việc' },
    { id: 'tasks:create', name: 'Tạo công việc' },
    { id: 'tasks:update', name: 'Sửa công việc' },
    { id: 'tasks:delete', name: 'Xóa công việc' },
    { id: 'users:manage', name: 'Quản lý người dùng' },
    { id: 'roles:manage', name: 'Quản lý vai trò' },
  ];

  for (const p of perms) {
    const perm = new Permission();
    perm.id = p.id;
    perm.name = p.name;
    em.persist(perm);
  }
  await em.flush();

  console.log('Seeding Default Roles for existing Tenants...');
  const tenants = await em.find(Tenant, {});
  const permissions = await em.find(Permission, {});

  for (const tenant of tenants) {
    // Admin Role
    const adminRole = new Role();
    adminRole.name = 'Admin';
    adminRole.description = 'Toàn quyền hệ thống';
    adminRole.tenant = tenant;
    adminRole.isSystemRole = true;
    permissions.forEach(p => adminRole.permissions.add(p));
    em.persist(adminRole);

    // Manager Role
    const managerRole = new Role();
    managerRole.name = 'Manager';
    managerRole.description = 'Quản lý dự án và công việc';
    managerRole.tenant = tenant;
    managerRole.isSystemRole = true;
    permissions.filter(p => !p.id.includes('users') && !p.id.includes('roles')).forEach(p => managerRole.permissions.add(p));
    em.persist(managerRole);

    // User Role
    const userRole = new Role();
    userRole.name = 'User';
    userRole.description = 'Nhân viên';
    userRole.tenant = tenant;
    userRole.isSystemRole = true;
    permissions.filter(p => p.id.includes('read')).forEach(p => userRole.permissions.add(p));
    em.persist(userRole);

    await em.flush();

    console.log(`Migrating users for tenant: ${tenant.name}`);
    const users = await em.find(User, { tenant });
    for (const user of users) {
      // For now, assign Admin role to everyone to avoid lockout, 
      // or try to guess from their old email/name if they were admin.
      user.role = adminRole;
      em.persist(user);
    }
  }

  await em.flush();
  console.log('Seed completed successfully.');
  await orm.close();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
