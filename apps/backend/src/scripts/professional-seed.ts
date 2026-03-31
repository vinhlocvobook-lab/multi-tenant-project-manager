import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config';
console.log('--- SEED SCRIPT LOADED ---');
import { Tenant } from '../app/tenants/entities/tenant.entity';
import { User } from '../app/users/entities/user.entity';
import { Department } from '../app/departments/entities/department.entity';
import { Partner } from '../app/partners/entities/partner.entity';
import { Project } from '../app/projects/entities/project.entity';
import { Task } from '../app/tasks/entities/task.entity';
import { TaskComment } from '../app/tasks/entities/task-comment.entity';
import { StatusDefinition } from '../app/metadata/entities/status-definition.entity';
import { PriorityDefinition } from '../app/metadata/entities/priority-definition.entity';
import { EntityType, PartnerType } from '@multi-tenant-project-manager/shared-types';
import { Permission } from '../app/auth/entities/permission.entity';
import { Role } from '../app/auth/entities/role.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  console.log('--- Starting Professional Seeding ---');
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em.fork();

  try {
    // 1. Create Tenant
    const tenant = new Tenant();
    tenant.name = 'Antigravity Tech Corp';
    tenant.slug = 'antigravity-tech';
    em.persist(tenant);

    // 2. Provision Default Metadata (Manually for seeder)
    const taskTodo = new StatusDefinition();
    taskTodo.name = 'To Do';
    taskTodo.type = EntityType.TASK;
    taskTodo.color = '#718096'; // Slate
    taskTodo.weight = 0;
    taskTodo.isDefault = true;
    taskTodo.tenant = tenant;

    const taskInProgress = new StatusDefinition();
    taskInProgress.name = 'In Progress';
    taskInProgress.type = EntityType.TASK;
    taskInProgress.color = '#3182ce'; // Blue
    taskInProgress.weight = 10;
    taskInProgress.tenant = tenant;

    const taskDone = new StatusDefinition();
    taskDone.name = 'Done';
    taskDone.type = EntityType.TASK;
    taskDone.color = '#38a169'; // Green
    taskDone.weight = 100;
    taskDone.tenant = tenant;

    const projActive = new StatusDefinition();
    projActive.name = 'Active';
    projActive.type = EntityType.PROJECT;
    projActive.color = '#3182ce';
    projActive.weight = 0;
    projActive.isDefault = true;
    projActive.tenant = tenant;

    const prioHigh = new PriorityDefinition();
    prioHigh.name = 'High';
    prioHigh.type = EntityType.TASK;
    prioHigh.color = '#e53e3e'; // Red
    prioHigh.weight = 80;
    prioHigh.tenant = tenant;

    const prioMedium = new PriorityDefinition();
    prioMedium.name = 'Medium';
    prioMedium.type = EntityType.TASK;
    prioMedium.color = '#d69e2e'; // Yellow
    prioMedium.weight = 50;
    prioMedium.tenant = tenant;

    const prioProjHigh = new PriorityDefinition();
    prioProjHigh.name = 'Critical';
    prioProjHigh.type = EntityType.PROJECT;
    prioProjHigh.color = '#e53e3e';
    prioProjHigh.weight = 90;
    prioProjHigh.tenant = tenant;

    em.persist([taskTodo, taskInProgress, taskDone, projActive, prioHigh, prioMedium, prioProjHigh]);

    // 3. Departments
    const itDept = new Department();
    itDept.name = 'IT Department';
    itDept.description = 'Handles software engineering and infrastructure';
    itDept.tenant = tenant;

    const marketingDept = new Department();
    marketingDept.name = 'Marketing & Sales';
    marketingDept.tenant = tenant;
    em.persist([itDept, marketingDept]);

    // 4. Client Partner
    const client = new Partner();
    client.name = 'Big Finance Bank';
    client.type = PartnerType.CLIENT;
    client.contactEmail = 'contact@bigfinance.com';
    client.tenant = tenant;
    em.persist(client);

    // Fetch or create permissions
    let permissions = await em.find(Permission, {});
    if (permissions.length === 0) {
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
        permissions.push(perm);
      }
    }

    // Create roles for the tenant
    const adminRole = new Role();
    adminRole.name = 'Admin';
    adminRole.description = 'Toàn quyền hệ thống';
    adminRole.tenant = tenant;
    adminRole.isSystemRole = true;
    permissions.forEach(p => adminRole.permissions.add(p));
    em.persist(adminRole);

    const managerRole = new Role();
    managerRole.name = 'Manager';
    managerRole.description = 'Quản lý dự án và công việc';
    managerRole.tenant = tenant;
    managerRole.isSystemRole = true;
    permissions.filter(p => !p.id.includes('users') && !p.id.includes('roles')).forEach(p => managerRole.permissions.add(p));
    em.persist(managerRole);

    const userRole = new Role();
    userRole.name = 'User';
    userRole.description = 'Nhân viên';
    userRole.tenant = tenant;
    userRole.isSystemRole = true;
    permissions.filter(p => p.id.includes('read')).forEach(p => userRole.permissions.add(p));
    em.persist(userRole);

    // 5. Users (with positions)
    const hashedPass = await bcrypt.hash('password123', 10);

    const headOfIT = new User();
    headOfIT.email = 'head.it@antigravity.com';
    headOfIT.password = hashedPass;
    headOfIT.fullName = 'John Doe';
    headOfIT.role = managerRole;
    headOfIT.position = 'Head of IT';
    headOfIT.department = itDept;
    headOfIT.tenant = tenant;

    const deputyIT = new User();
    deputyIT.email = 'deputy.it@antigravity.com';
    deputyIT.password = hashedPass;
    deputyIT.fullName = 'Jane Smith';
    deputyIT.role = managerRole;
    deputyIT.position = 'Deputy Head of IT';
    deputyIT.department = itDept;
    deputyIT.tenant = tenant;

    const devUser = new User();
    devUser.email = 'dev1@antigravity.com';
    devUser.password = hashedPass;
    devUser.fullName = 'Bob Developer';
    devUser.role = userRole;
    devUser.position = 'Senior Engineer';
    devUser.department = itDept;
    devUser.tenant = tenant;

    const adminUser = new User();
    adminUser.email = 'admin@acme.com';
    adminUser.password = hashedPass;
    adminUser.fullName = 'System Admin';
    adminUser.role = adminRole;
    adminUser.tenant = tenant;

    em.persist([headOfIT, deputyIT, devUser, adminUser]);

    // Multi-leader logic
    itDept.leaders.add(headOfIT);
    itDept.leaders.add(deputyIT);

    // 6. Project (Multi-leader)
    const project = new Project();
    project.name = 'Core Banking Refresh 2026';
    project.description = 'Modernizing the legacy ERP system for Big Finance Bank';
    project.status = projActive;
    project.priority = prioProjHigh;
    project.tenant = tenant;
    project.startDate = new Date('2026-01-01');
    project.endDate = new Date('2026-12-31');
    project.leaders.add(headOfIT);
    project.leaders.add(deputyIT);
    em.persist(project);

    // 7. Tasks (Independent & Project-based)
    // Independent Task
    const indTask = new Task();
    indTask.title = 'Quarterly Infrastructure Review';
    indTask.status = taskTodo;
    indTask.priority = prioMedium;
    indTask.tenant = tenant;
    indTask.assignee = headOfIT;
    em.persist(indTask);

    // Project Task with sub-tasks
    const mainTask = new Task();
    mainTask.title = 'Back-end API Migration';
    mainTask.status = taskInProgress;
    mainTask.priority = prioHigh;
    mainTask.project = project;
    mainTask.client = client;
    mainTask.tenant = tenant;
    mainTask.assignee = devUser;
    em.persist(mainTask);

    const subTask1 = new Task();
    subTask1.title = 'Database Schema Mapping';
    subTask1.status = taskDone;
    subTask1.priority = prioHigh;
    subTask1.parentTask = mainTask;
    subTask1.tenant = tenant;
    subTask1.assignee = devUser;
    em.persist(subTask1);

    const subTask2 = new Task();
    subTask2.title = 'Endpoint Implementation';
    subTask2.status = taskInProgress;
    subTask2.priority = prioMedium;
    subTask2.parentTask = mainTask;
    subTask2.tenant = tenant;
    subTask2.assignee = devUser;
    em.persist(subTask2);

    // 8. Comments
    const comment = new TaskComment();
    comment.content = 'Moving to Endpoint Implementation. Schema mapping is done and verified.';
    comment.task = mainTask;
    comment.author = devUser;
    comment.tenant = tenant;
    em.persist(comment);

    await em.flush();
    console.log('--- Seeding Completed Successfully ---');
    console.log('Tenant: antigravity-tech');
    console.log('Users: head.it@antigravity.com, deputy.it@antigravity.com, dev1@antigravity.com');
    console.log('Project Leaders: John Doe, Jane Smith (Multi-leader support)');
    console.log('Hierarchical Tasks: Main task + 2 sub-tasks + 1 comment');

  } catch (error) {
    console.error('--- Seeding Failed ---');
    console.error(error);
  } finally {
    await orm.close();
  }
}

seed();
