import { Migration } from '@mikro-orm/migrations';

export class Migration20260331013431 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`permissions\` (\`id\` varchar(255) not null, \`name\` varchar(255) not null, \`description\` varchar(255) null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`roles\` (\`id\` varchar(36) not null, \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`name\` varchar(255) not null, \`description\` varchar(255) null, \`is_system_role\` tinyint(1) not null default false, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`roles\` add index \`roles_tenant_id_index\`(\`tenant_id\`);`);

    this.addSql(`create table \`roles_permissions\` (\`role_id\` varchar(36) not null, \`permission_id\` varchar(255) not null, primary key (\`role_id\`, \`permission_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`roles_permissions\` add index \`roles_permissions_role_id_index\`(\`role_id\`);`);
    this.addSql(`alter table \`roles_permissions\` add index \`roles_permissions_permission_id_index\`(\`permission_id\`);`);

    this.addSql(`alter table \`roles\` add constraint \`roles_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`roles_permissions\` add constraint \`roles_permissions_role_id_foreign\` foreign key (\`role_id\`) references \`roles\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`roles_permissions\` add constraint \`roles_permissions_permission_id_foreign\` foreign key (\`permission_id\`) references \`permissions\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`users\` drop column \`role\`;`);

    this.addSql(`alter table \`users\` add \`role_id\` varchar(36) not null;`);
    this.addSql(`alter table \`users\` modify \`current_refresh_token\` text;`);
    this.addSql(`alter table \`users\` add constraint \`users_role_id_foreign\` foreign key (\`role_id\`) references \`roles\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`users\` add unique \`users_full_name_unique\`(\`full_name\`);`);
    this.addSql(`alter table \`users\` add index \`users_role_id_index\`(\`role_id\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`roles_permissions\` drop foreign key \`roles_permissions_permission_id_foreign\`;`);

    this.addSql(`alter table \`roles_permissions\` drop foreign key \`roles_permissions_role_id_foreign\`;`);

    this.addSql(`alter table \`users\` drop foreign key \`users_role_id_foreign\`;`);

    this.addSql(`drop table if exists \`permissions\`;`);

    this.addSql(`drop table if exists \`roles\`;`);

    this.addSql(`drop table if exists \`roles_permissions\`;`);

    this.addSql(`alter table \`users\` drop index \`users_full_name_unique\`;`);
    this.addSql(`alter table \`users\` drop index \`users_role_id_index\`;`);
    this.addSql(`alter table \`users\` drop column \`role_id\`;`);

    this.addSql(`alter table \`users\` add \`role\` enum('admin', 'manager', 'user') not null default 'user';`);
    this.addSql(`alter table \`users\` modify \`current_refresh_token\` varchar(255);`);
  }

}
