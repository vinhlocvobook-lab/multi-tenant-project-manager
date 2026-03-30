import { Entity, Property, ManyToOne, Unique, Enum } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { BaseTenantEntity } from '../../common/entities/base-tenant.entity';
import { Department } from '../../departments/entities/department.entity';
import { UserRole } from '@multi-tenant-project-manager/shared-types';

@Entity({ tableName: 'users' })
export class User extends BaseTenantEntity {
  @Property()
  @Unique()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  fullName!: string;

  @Enum(() => UserRole)
  role: UserRole = UserRole.USER;

  @Property({ nullable: true })
  position?: string;

  @ManyToOne(() => Department, { nullable: true })
  department?: Department;

  @Property({ nullable: true, hidden: true, type: 'text' })
  currentRefreshToken?: string;

  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  async setCurrentRefreshToken(refreshToken: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.currentRefreshToken = await bcrypt.hash(refreshToken, salt);
  }

  async validateRefreshToken(refreshToken: string): Promise<boolean> {
    if (!this.currentRefreshToken) return false;
    return bcrypt.compare(refreshToken, this.currentRefreshToken);
  }
}
