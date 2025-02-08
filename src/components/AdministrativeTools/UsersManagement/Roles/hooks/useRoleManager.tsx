import { Permission, Role } from "@/types/user-management";
import { create } from "zustand";

interface RoleManagerData {
  id?: number;
  label?: string;
  description?: string;
  permissions?: Permission[];
}

interface RoleManager extends RoleManagerData {
  set: (name: keyof RoleManagerData, value: any) => void;
  reset: () => void;
  getRole: () => Partial<Role>;
  setRole: (data: Partial<Role>) => void;
  addPermission: (permission: Permission) => void;
  removePermission: (index?: number) => void;
  isPermissionSelected: (permissionId?: number) => boolean;
}

const initialState: RoleManagerData = {
  id: undefined,
  label: "",
  description: "",
  permissions: [],
};

export const useRoleManager = create<RoleManager>((set, get) => ({
  ...initialState,

  set: (name: keyof RoleManager, value: any) => {
    set((state) => ({
      ...state,
      [name]: value,
    }));
  },

  reset: () => {
    set({ ...initialState });
  },

  getRole: () => {
    const data = get();
    return {
      id: data.id,
      label: data.label,
      description: data.description,
    };
  },

  setRole: (data: Partial<Role>) => {
    set((state) => ({
      ...state,
      id: data.id,
      label: data.label,
      description: data.description,
      permissions:
        data.permissions
          ?.map((p) => p.permission)
          .filter((p): p is Permission => p !== undefined) || [],
    }));
  },

  addPermission: (permission: Permission) => {
    const { permissions } = get();
    if (!permissions?.some((p) => p.id === permission.id)) {
      set((state) => ({
        ...state,
        permissions: [...(permissions || []), permission],
      }));
    }
  },

  removePermission: (permissionId?: number) => {
    set((state) => ({
      ...state,
      permissions: state.permissions?.filter((p) => p.id !== permissionId),
    }));
  },

  isPermissionSelected: (permissionId?: number) => {
    const { permissions } = get();
    return permissions?.some((p) => p.id === permissionId) || false;
  },
}));
