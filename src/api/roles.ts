import axios from "axios";
import { Paginated } from "@/lib/prisma/interfaces/pagination";
import { ROLE_FILTER_ATTRIBUTES } from "@/constants/role.filter-fields";
import { Role } from "@/types/user-management";

const findPaginated = async (
  page: number = 1,
  size: number = 5,
  order: "ASC" | "DESC" = "ASC",
  sortKey: string,
  search: string = "",
  fields: string[] = [],
  join: string[] = ["permissions.permission"]
): Promise<Paginated<Role>> => {
  const filter = search
    ? "(" +
    Object.values(ROLE_FILTER_ATTRIBUTES)
      .map((key) => `${key}||$cont||${search}`)
      .join(";") +
    ")"
    : "";
  const response = await axios.get<Paginated<Role>>(`/api/roles/list?`, {
    params: {
      filter,
      page,
      size,
      sort: `${sortKey}:${order}`,
      fields: fields ? fields.join(",") : "",
      join: join ? join.join(",") : "",
    },
  });
  return response.data;
};

const findAll = async (): Promise<Role[]> => {
  const response = await axios.get<Role[]>(`/api/roles`);
  return response.data;
};

const findById = async (roleId: number): Promise<Role> => {
  const response = await axios.get<Role>(`/api/roles/${roleId}`);
  return response.data;
};

const create = async (role: Partial<Role>): Promise<Role> => {
  const response = await axios.post<Role>("/api/roles", role);
  return response.data;
};

const update = async (roleId: number, role: Partial<Role>): Promise<Role> => {
  const response = await axios.put<Role>(`/api/roles/${roleId}`, role);
  return response.data;
};

const duplicate = async (roleId?: number): Promise<Role> => {
  const response = await axios.get<Role>(`/api/roles/duplicate/${roleId}`);
  return response.data;
}

const remove = async (roleId?: number): Promise<void> => {
  await axios.delete(`/api/roles/${roleId}`);
};

export const role = {
  findPaginated,
  findAll,
  findById,
  create,
  update,
  duplicate,
  remove,
};
