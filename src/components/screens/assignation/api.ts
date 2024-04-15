import { GetAssignationListResponse, GetAssignationResponse } from "@/@types/api/assignation";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/auth";

export const getAssignationList = async () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "http://localhost:3002/assignation";
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetAssignationListResponse;
};

export const getAssignationDetails = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/assignation/${id}`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetAssignationResponse;
};

export const createAssignation = async (data: AssignationPayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "http://localhost:3002/assignation";
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

export const updateAssignation = async (id: number, data: EditAssignationPayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/assignation/${id}`;
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

export const updateAssignationFileStatus = async (
  fileId: number,
  data: UpdateAssignationFileStatusPayload,
) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/assignation/update-file-status/${fileId}`;
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

export const deleteAssignation = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `http://localhost:3002/assignation/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
  return res.json();
};

export interface AssignationPayload {
  name: string;
  description: string;
  periodId: number;
  enterpriseId: number;
  fileChecklistId: number;
}

export interface EditAssignationPayload extends AssignationPayload {
  id: number;
}

export interface UpdateAssignationFileStatusPayload {
  assignationUploadedFileStatusId: number;
  comment: string;
}
