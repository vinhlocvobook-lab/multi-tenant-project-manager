import { Migration } from '@mikro-orm/migrations';

export class Migration20260329114935 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`users\` (\`id\` varchar(36) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`full_name\` varchar(255) not null, \`role\` varchar(255) not null default 'agent', \`tenant_id\` varchar(36) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`users\` add unique \`users_email_unique\`(\`email\`);`);
    this.addSql(`alter table \`users\` add index \`users_tenant_id_index\`(\`tenant_id\`);`);

    this.addSql(`alter table \`users\` add constraint \`users_tenant_id_foreign\` foreign key (\`tenant_id\`) references \`tenants\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`users\`;`);
  }

}
