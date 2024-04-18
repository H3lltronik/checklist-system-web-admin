import { GetRoleResponse, GetRolesListResponse } from "@/@types/api/roles";
import { httpRequest } from "@/http/http-client";

export const getRoleList = async () => {
  const result = await httpRequest<GetRolesListResponse>({
    url: "/api/role",
    method: "GET",
  });

  return result.data;
};

export const getRoleDetails = async (id: number) => {
  const result = await httpRequest<GetRoleResponse>({
    url: `/api/role/${id}`,
    method: "GET",
  });

  return result.data;
};

export const createRole = async (data: RolePayload) => {
  const result = await httpRequest({
    url: "/api/role",
    method: "POST",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const updateRole = async (id: number, data: EditRolePayload) => {
  const result = await httpRequest({
    url: `/api/role/${id}`,
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const deleteRole = async (id: number) => {
  const result = await httpRequest({
    url: `/api/role/${id}`,
    method: "DELETE",
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export interface RolePayload {
  name: string;
  permissions: PermissionPayload[];
}

type PermissionPayload = {
  actionId: number;
  subjectId: number;
};

export interface EditRolePayload extends RolePayload {}
