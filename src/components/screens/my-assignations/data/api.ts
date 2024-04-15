import {
  GetAssignationResponse,
  GetEnterpriseAssignationListResponse,
} from "@/@types/api/assignation";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/auth";

export const getEnterpriseAssignations = async () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/my-assignations/`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const data = await response.json();

  return data as GetEnterpriseAssignationListResponse;
};

export const getEnterpriseAssignationsDetails = async (assignationId: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/my-assignations/${assignationId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const data = await response.json();

  return data as GetAssignationResponse;
};

export type AddFileAssignation = {
  assignationId: number;
  uploadedFileId: number;
  checklistItemId: number;
};

export const addFilesToAssignation = async (params: { files: AddFileAssignation[] }) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/my-assignations/add-files`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(params),
  });

  const data = await response.json();

  return data;
};

export const removeFileFromAssignation = async (params: {
  assignationId: number;
  assignationUploadedFileId: number;
}) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/my-assignations/remove-file`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(params),
  });

  const data = await response.json();

  return data;
};
