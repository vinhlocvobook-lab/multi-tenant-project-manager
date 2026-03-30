import { Migration } from '@mikro-orm/migrations';

export class Migration20260330072733 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`users\` add \`current_refresh_token\` varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`users\` drop column \`current_refresh_token\`;`);
  }

}
