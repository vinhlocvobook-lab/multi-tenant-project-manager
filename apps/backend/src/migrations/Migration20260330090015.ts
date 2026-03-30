import { Migration } from '@mikro-orm/migrations';

export class Migration20260330090015 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`tenants\` (\`id\` varchar(36) not null, \`name\` varchar(255) not null, \`slug\` varchar(255) not null, \`db_config\` json null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`is_active\` tinyint(1) not null default true, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`tenants\` add unique \`tenants_slug_unique\`(\`slug\`);`);

    this.addSql(`create table \`status_definitions\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` varchar(255) not null, \`color\` varchar(255) not null, \`type\` enum('PROJECT', 'TASK') not null, \`weight\` int not null default 0, \`is_default\` tinyint(1) not null default false, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`status_definitions\` add index \`status_definitions_tenant_id_index\`(\`tenant_id\`);`);

    this.addSql(`create table \`priority_definitions\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` varchar(255) not null, \`color\` varchar(255) not null, \`weight\` int not null default 0, \`type\` enum('PROJECT', 'TASK') not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`priority_definitions\` add index \`priority_definitions_tenant_id_index\`(\`tenant_id\`);`);

    this.addSql(`create table \`projects\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` varchar(255) not null, \`description\` text null, \`status_id\` varchar(36) not null, \`priority_id\` varchar(36) not null, \`client_id\` varchar(36) null, \`start_date\` datetime null, \`end_date\` datetime null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`projects\` add index \`projects_tenant_id_index\`(\`tenant_id\`);`);
    this.addSql(`alter table \`projects\` add index \`projects_status_id_index\`(\`status_id\`);`);
    this.addSql(`alter table \`projects\` add index \`projects_priority_id_index\`(\`priority_id\`);`);
    this.addSql(`alter table \`projects\` add index \`projects_client_id_index\`(\`client_id\`);`);

    this.addSql(`create table \`partners\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` varchar(255) not null, \`type\` enum('client', 'partner') not null default 'client', \`contact_email\` varchar(255) null, \`phone\` varchar(255) null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`partners\` add index \`partners_tenant_id_index\`(\`tenant_id\`);`);

    this.addSql(`create table \`departments\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` varchar(255) not null, \`description\` text null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`departments\` add index \`departments_tenant_id_index\`(\`tenant_id\`);`);

    this.addSql(`create table \`users\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`full_name\` varchar(255) not null, \`role\` enum('admin', 'manager', 'user') not null default 'user', \`position\` varchar(255) null, \`department_id\` varchar(36) null, \`current_refresh_token\` varchar(255) null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`users\` add index \`users_tenant_id_index\`(\`tenant_id\`);`);
    this.addSql(`alter table \`users\` add unique \`users_email_unique\`(\`email\`);`);
    this.addSql(`alter table \`users\` add index \`users_department_id_index\`(\`department_id\`);`);

    this.addSql(`create table \`tasks\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`title\` varchar(255) not null, \`description\` text null, \`status_id\` varchar(36) not null, \`priority_id\` varchar(36) not null, \`project_id\` varchar(36) null, \`client_id\` varchar(36) null, \`assignee_id\` varchar(36) null, \`parent_task_id\` varchar(36) null, \`due_date\` datetime null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`tasks\` add index \`tasks_tenant_id_index\`(\`tenant_id\`);`);
    this.addSql(`alter table \`tasks\` add index \`tasks_status_id_index\`(\`status_id\`);`);
    this.addSql(`alter table \`tasks\` add index \`tasks_priority_id_index\`(\`priority_id\`);`);
    this.addSql(`alter table \`tasks\` add index \`tasks_project_id_index\`(\`project_id\`);`);
    this.addSql(`alter table \`tasks\` add index \`tasks_client_id_index\`(\`client_id\`);`);
    this.addSql(`alter table \`tasks\` add index \`tasks_assignee_id_index\`(\`assignee_id\`);`);
    this.addSql(`alter table \`tasks\` add index \`tasks_parent_task_id_index\`(\`parent_task_id\`);`);

    this.addSql(`create table \`task_comments\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`content\` text not null, \`task_id\` varchar(36) not null, \`author_id\` varchar(36) not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`task_comments\` add index \`task_comments_tenant_id_index\`(\`tenant_id\`);`);
    this.addSql(`alter table \`task_comments\` add index \`task_comments_task_id_index\`(\`task_id\`);`);
    this.addSql(`alter table \`task_comments\` add index \`task_comments_author_id_index\`(\`author_id\`);`);

    this.addSql(`create table \`projects_leaders\` (\`project_id\` varchar(36) not null, \`user_id\` varchar(36) not null, primary key (\`project_id\`, \`user_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`projects_leaders\` add index \`projects_leaders_project_id_index\`(\`project_id\`);`);
    this.addSql(`alter table \`projects_leaders\` add index \`projects_leaders_user_id_index\`(\`user_id\`);`);

    this.addSql(`create table \`projects_departments\` (\`project_id\` varchar(36) not null, \`department_id\` varchar(36) not null, primary key (\`project_id\`, \`department_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`projects_departments\` add index \`projects_departments_project_id_index\`(\`project_id\`);`);
    this.addSql(`alter table \`projects_departments\` add index \`projects_departments_department_id_index\`(\`department_id\`);`);

    this.addSql(`create table \`departments_leaders\` (\`department_id\` varchar(36) not null, \`user_id\` varchar(36) not null, primary key (\`department_id\`, \`user_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`departments_leaders\` add index \`departments_leaders_department_id_index\`(\`department_id\`);`);
    this.addSql(`alter table \`departments_leaders\` add index \`departments_leaders_user_id_index\`(\`user_id\`);`);

    this.addSql(`alter table \`status_definitions\` add constraint \`status_definitions_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`priority_definitions\` add constraint \`priority_definitions_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`projects\` add constraint \`projects_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`projects\` add constraint \`projects_status_id_foreign\` foreign key (\`status_id\`) references \`status_definitions\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`projects\` add constraint \`projects_priority_id_foreign\` foreign key (\`priority_id\`) references \`priority_definitions\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`partners\` add constraint \`partners_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`departments\` add constraint \`departments_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`users\` add constraint \`users_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`users\` add constraint \`users_department_id_foreign\` foreign key (\`department_id\`) references \`departments\` (\`id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`tasks\` add constraint \`tasks_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`tasks\` add constraint \`tasks_status_id_foreign\` foreign key (\`status_id\`) references \`status_definitions\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`tasks\` add constraint \`tasks_priority_id_foreign\` foreign key (\`priority_id\`) references \`priority_definitions\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`tasks\` add constraint \`tasks_project_id_foreign\` foreign key (\`project_id\`) references \`projects\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`tasks\` add constraint \`tasks_client_id_foreign\` foreign key (\`client_id\`) references \`partners\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`tasks\` add constraint \`tasks_assignee_id_foreign\` foreign key (\`assignee_id\`) references \`users\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`tasks\` add constraint \`tasks_parent_task_id_foreign\` foreign key (\`parent_task_id\`) references \`tasks\` (\`id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`task_comments\` add constraint \`task_comments_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`task_comments\` add constraint \`task_comments_task_id_foreign\` foreign key (\`task_id\`) references \`tasks\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`task_comments\` add constraint \`task_comments_author_id_foreign\` foreign key (\`author_id\`) references \`users\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`projects\` add constraint \`projects_client_id_foreign\` foreign key (\`client_id\`) references \`partners\` (\`id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`projects_leaders\` add constraint \`projects_leaders_project_id_foreign\` foreign key (\`project_id\`) references \`projects\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`projects_leaders\` add constraint \`projects_leaders_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`projects_departments\` add constraint \`projects_departments_project_id_foreign\` foreign key (\`project_id\`) references \`projects\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`projects_departments\` add constraint \`projects_departments_department_id_foreign\` foreign key (\`department_id\`) references \`departments\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`departments_leaders\` add constraint \`departments_leaders_department_id_foreign\` foreign key (\`department_id\`) references \`departments\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`departments_leaders\` add constraint \`departments_leaders_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete cascade;`);
  }

}
