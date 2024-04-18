import { GetUserListResponse, GetUserResponse, UserProfileDetails } from "@/@types/api/user";
import { httpRequest } from "@/http/http-client";

export const getUserList = async () => {
  const result = await httpRequest<GetUserListResponse>({
    url: "/api/user?with=credentials",
    method: "GET",
  });

  return result.data;
};

export const getUserDetails = async (id: number) => {
  const result = await httpRequest<GetUserResponse>({
    url: `/api/user/${id}?with=enterprises,credentials`,
    method: "GET",
  });

  return result.data;
};

export const getUserProfileByEmail = async (email: string) => {
  const result = await httpRequest<UserProfileDetails>({
    url: `/api/user/by-email/${email}`,
    method: "GET",
  });

  return result.data;
};

export const createUser = async (data: UserPayload) => {
  const result = await httpRequest({
    url: "/api/user",
    method: "POST",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const updateUser = async (id: number, data: EditUserPayload) => {
  const result = await httpRequest({
    url: `/api/user/${id}`,
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const updateUserFileStatus = async (fileId: number, data: UpdateUserFileStatusPayload) => {
  const result = await httpRequest({
    url: `/api/user/update-file-status/${fileId}`,
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const deleteUser = async (id: number) => {
  const result = await httpRequest({
    url: `/api/user/${id}`,
    method: "DELETE",
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export interface UserPayload {
  name: string;
  pictureUrl: string;
  enterprises: number[];
  credential: {
    email: string;
    password: string;
    repeatPassword: string;
    roleId: number;
  };
}

export interface EditUserPayload extends UserPayload {}

export interface UpdateUserFileStatusPayload {
  userUploadedFileStatusId: number;
  comment: string;
}
