import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  @Unique()
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  fullName!: string;

  @Property({ default: 'agent' })
  role: 'admin' | 'manager' | 'agent' = 'agent';

  @ManyToOne(() => Tenant)
  tenant!: Tenant;

  @Property({ nullable: true, hidden: true })
  currentRefreshToken?: string;

  @Property({ persist: false })
  get tenantId(): string {
    return this.tenant.id;
  }

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

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
