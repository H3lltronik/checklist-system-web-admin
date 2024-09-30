import { GetUserListResponse, GetUserResponse, UserProfileDetails } from "@/@types/api/user";
import { httpRequest } from "@/http/http-client";
import { Encryptor } from "@/lib/security/encryption";

const encryptor = new Encryptor(import.meta.env.VITE_SHARED_SECRET);

const encryptPassword = (password: string) => {
  return encryptor.encrypt(password);
};

export const getUserList = async () => {
  const result = await httpRequest<GetUserListResponse>({
    url: "/api/user?with=credentials,credentials.role",
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
  let updatedData = { ...data } as CreateUserDto;

  if (updatedData.credential.password) {
    const { cipherText: password, iv } = encryptPassword(updatedData.credential.password);

    updatedData = {
      ...updatedData,
      credential: {
        ...updatedData.credential,
        password,
        iv,
        hasPassword: true,
      },
    };
  } else {
    updatedData = {
      ...updatedData,
      credential: {
        ...updatedData.credential,
        hasPassword: false,
      },
    };
  }

  const result = await httpRequest({
    url: "/api/user",
    method: "POST",
    body: JSON.stringify(updatedData),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const updateUser = async (id: number, data: EditUserPayload) => {
  let updatedData = { ...data };

  if (updatedData.credential?.password) {
    const { cipherText: password, iv } = encryptPassword(updatedData.credential.password);

    updatedData = {
      ...updatedData,
      credential: {
        ...updatedData.credential,
        repeatPassword: undefined,
        password,
        iv
      } as unknown as UserPayload["credential"],
    };
  }

  const result = await httpRequest({
    url: `/api/user/${id}`,
    method: "PATCH",
    body: JSON.stringify(updatedData),
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
    password?: string;
    repeatPassword?: string;
    hasPassword: boolean;
    mfaEnabled: boolean;
    roleId: number;
  };
}

export interface EditUserPayload extends UserPayload {}

export interface UpdateUserFileStatusPayload {
  userUploadedFileStatusId: number;
  comment: string;
}

export class CreateUserDto {
  name!: string;
  pictureUrl!: string;
  enterprises!: number[];
  credential!: {
    email: string;
    hasPassword: boolean;
    password: string;
    iv: string;
    roleId: number;
    mfaEnabled: boolean;
  }
}