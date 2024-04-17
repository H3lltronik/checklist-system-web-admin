import { GetChecklistListResponse, GetChecklistResponse } from "@/@types/api/checklist";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/auth";

export const getChecklistList = async () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "/api/file-checklist";
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetChecklistListResponse;
};

export const getChecklistDetails = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `/api/file-checklist/${id}`;
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as GetChecklistResponse;
};

export const createChecklist = async (data: FileChecklistPayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "/api/file-checklist";
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

export const updateChecklist = async (id: number, data: EditFileChecklistPayload) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `/api/file-checklist/${id}`;
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

export const deleteChecklist = async (id: number) => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = `/api/file-checklist/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
  return res.json();
};

export interface FileChecklistPayload {
  title: string;
  description: string;
  checklistItems: ChecklistItemPayload[];
}

export interface EditFileChecklistPayload extends FileChecklistPayload {
  id: number;
  checklistItems: EditChecklistItemPayload[];
}

export interface ChecklistItemPayload {
  title: string;
  description: string;
  allowMultiple: boolean;
  maxSizeInBytes: number;
  allowedMimeTypes: string[];
  maxFiles?: number;
}

export interface EditChecklistItemPayload extends ChecklistItemPayload {
  id: number;
}
