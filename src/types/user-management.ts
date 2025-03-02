import { DatabaseEntity } from "./utilities/database-entity";

export interface User extends DatabaseEntity {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  isActive: boolean;
  password?: string;
  username: string;
  email: string;
  emailVerified?: Date;
  image: string;
  roleId: number;
  role?: Role;
  refreshToken?: string;
}

export interface Role extends DatabaseEntity {
  id: number;
  label: string;
  description: string;
  permissions?: RolePermission[];
  users?: User[];
}

export interface CreateRoleDto {
  label?: string;
  description?: string;
  permissionIds?: number[];
}

export interface UpdateRoleDto extends CreateRoleDto {}

export interface Permission extends DatabaseEntity {
  id: number;
  label: string;
  description: string;
  roles?: RolePermission[];
}

export interface RolePermission extends DatabaseEntity {
  id: number;
  roleId: number;
  permissionId: number;
  role?: Role;
  permission?: Permission;
}
