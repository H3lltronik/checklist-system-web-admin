import { GetUserListResponse, GetUserResponse } from "@/@types/api/user";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/auth";

export const getUserList = async () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "http://localhost:3002/user";
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetUserListResponse;
};

export const getUserDetails = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/user/${id}?with=enterprises`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetUserResponse;
};

export const createUser = async (data: UserPayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "http://localhost:3002/user";
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

export const updateUser = async (id: number, data: EditUserPayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/user/${id}`;
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

export const updateUserFileStatus = async (fileId: number, data: UpdateUserFileStatusPayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/user/update-file-status/${fileId}`;
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

export const deleteUser = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/user/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
  return res.json();
};

export interface UserPayload {
  email: string;
  password: string;
  roleId: number;
  enterprises: number[];
}

export interface EditUserPayload extends UserPayload {}

export interface UpdateUserFileStatusPayload {
  userUploadedFileStatusId: number;
  comment: string;
}
