import { GetRoleResponse, GetRolesListResponse } from "@/@types/api/roles";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/auth";
import { notification } from "antd";

export const getRoleList = async () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "http://localhost:3002/role";
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetRolesListResponse;
};

export const getRoleDetails = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/role/${id}`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      notification.error({
        message: "Ocurrio un error",
      });
      console.error(err);
      return null;
    });
  // TODO: Implementa un global error handler

  return data as GetRoleResponse;
};

export const createRole = async (data: RolePayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "http://localhost:3002/role";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateRole = async (id: number, data: EditRolePayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/role/${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteRole = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/role/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
  return res.json();
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
