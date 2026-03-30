export interface Tenant {
  id: string;
  name: string;
  slug: string; // Used for subdomains/URL paths
  dbConfig?: {
    type: 'shared' | 'dedicated';
    connectionString?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'manager' | 'agent';
  tenantId: string;
}

export interface CallRecord {
  id: string;
  tenantId: string;
  callerNumber: string;
  destinationNumber: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  recordPath: string; // The Asterisk recording path
  direction: 'inbound' | 'outbound';
  status: 'completed' | 'busy' | 'no-answer' | 'failed';
  aiMetadata?: {
    transcription?: string;
    sentiment?: string;
    summary?: string;
    interface: string;
    confidenceScore?: number;
  };
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'archived' | 'completed';
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  projectId: string;
  tenantId: string;
  assigneeId?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
