import { GetUserListResponse, GetUserResponse, UserProfileDetails } from "@/@types/api/user";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/auth";

export const getUserList = async () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "http://localhost:3002/user?with=credentials";
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetUserListResponse;
};

export const getUserDetails = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/user/${id}?with=enterprises,credentials`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetUserResponse;
};

export const getUserProfileByEmail = async (email: string) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/user/by-email/${email}`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as UserProfileDetails;
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

// {
//   "name": "Juan Perez",
//   "pictureUrl": "https://ejemplo.com/imagen.jpg",
//   "enterprises": [1],
//   "credential": {
//     "email": "juan.perez@example.com",
//     "password": "ContraseñaSegura123",
//     "repeatPassword": "ContraseñaSegura123",
//     "roleId": 2
//   }
// }

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
