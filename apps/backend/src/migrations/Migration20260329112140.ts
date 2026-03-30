import { Migration } from '@mikro-orm/migrations';

export class Migration20260329112140 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`tenants\` (\`id\` varchar(36) not null, \`name\` varchar(255) not null, \`slug\` varchar(255) not null, \`db_config\` json null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`is_active\` tinyint(1) not null default true, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`tenants\` add unique \`tenants_slug_unique\`(\`slug\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`tenants\`;`);
  }

}
