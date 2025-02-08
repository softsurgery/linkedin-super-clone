// This file was auto-generated by prisma-generator-typescript-interfaces

export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  isActive: boolean | null;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  accounts?: Account[];
  sessions?: Session[];
  roleId: number | null;
  role?: Role | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  refresh_token_expires_in: number | null;
  user?: User | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface Role {
  id: number;
  label: string;
  description: string | null;
  permissions?: RolePermission[];
  users?: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: number;
  label: string;
  description: string | null;
  roles?: RolePermission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RolePermission {
  id: number;
  roleId: number;
  permissionId: number;
  role?: Role;
  permission?: Permission;
  createdAt: Date;
  updatedAt: Date;
}
