export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}

export enum EntityType {
  PROJECT = 'PROJECT',
  TASK = 'TASK',
}

export enum PartnerType {
  CLIENT = 'client',
  PARTNER = 'partner',
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  dbConfig?: {
    type: 'shared' | 'dedicated';
    connectionString?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string; // e.g., 'projects:create'
  name: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  tenantId: string;
  permissions: Permission[] | string[];
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  tenantId: string;
  departmentId?: string;
  position?: string;
}

export interface StatusDefinition {
  id: string;
  name: string;
  color: string;
  type: EntityType;
  weight: number;
  isDefault: boolean;
  tenantId: string;
}

export interface PriorityDefinition {
  id: string;
  name: string;
  color: string;
  weight: number; // Higher weight = higher priority
  type: EntityType;
  tenantId: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  tenantId: string;
  leaderIds: string[]; // List of User IDs
}

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  contactEmail?: string;
  phone?: string;
  tenantId: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  statusId: string;
  status?: StatusDefinition;
  priorityId: string;
  priority?: PriorityDefinition;
  startDate?: Date;
  endDate?: Date;
  leaderIds: string[];
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  statusId: string;
  status?: StatusDefinition;
  priorityId: string;
  priority?: PriorityDefinition;
  projectId?: string; // Optional for independent tasks
  clientId?: string;  // Linked to a Partner
  parentTaskId?: string; // For sub-tasks
  tenantId: string;
  assigneeId?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskComment {
  id: string;
  content: string;
  taskId: string;
  authorId: string;
  author?: User;
  tenantId: string;
  createdAt: Date;
}

// DTOs for Auth
export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
