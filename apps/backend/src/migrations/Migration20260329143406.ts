import { Migration } from '@mikro-orm/migrations';

export class Migration20260329143406 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`projects\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` varchar(255) not null, \`description\` text null, \`status\` varchar(255) not null default 'active', primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`projects\` add index \`projects_tenant_id_index\`(\`tenant_id\`);`);

    this.addSql(`create table \`tasks\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`title\` varchar(255) not null, \`description\` text null, \`status\` varchar(255) not null default 'todo', \`priority\` varchar(255) not null default 'medium', \`project_id\` varchar(36) not null, \`assignee_id\` varchar(36) null, \`due_date\` datetime null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`tasks\` add index \`tasks_tenant_id_index\`(\`tenant_id\`);`);
    this.addSql(`alter table \`tasks\` add index \`tasks_project_id_index\`(\`project_id\`);`);
    this.addSql(`alter table \`tasks\` add index \`tasks_assignee_id_index\`(\`assignee_id\`);`);

    this.addSql(`alter table \`projects\` add constraint \`projects_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`tasks\` add constraint \`tasks_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`tasks\` add constraint \`tasks_project_id_foreign\` foreign key (\`project_id\`) references \`projects\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`tasks\` add constraint \`tasks_assignee_id_foreign\` foreign key (\`assignee_id\`) references \`users\` (\`id\`) on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`tasks\` drop foreign key \`tasks_project_id_foreign\`;`);

    this.addSql(`drop table if exists \`projects\`;`);

    this.addSql(`drop table if exists \`tasks\`;`);
  }

}
