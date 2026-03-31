import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'permissions' })
export class Permission {
  @PrimaryKey()
  id!: string; // e.g., 'projects:create'

  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;
}
