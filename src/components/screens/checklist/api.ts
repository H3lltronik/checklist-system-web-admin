import { GetChecklistListResponse, GetChecklistResponse } from "@/@types/api/checklist";
import { httpRequest } from "@/http/http-client";

export const getChecklistList = async () => {
  const result = await httpRequest<GetChecklistListResponse>({
    url: "/api/file-checklist",
    method: "GET",
  });
  return result.data;
};

export const getChecklistDetails = async (id: number) => {
  const result = await httpRequest<GetChecklistResponse>({
    url: `/api/file-checklist/${id}`,
    method: "GET",
  });
  return result.data;
};

export const createChecklist = async (data: FileChecklistPayload) => {
  const result = await httpRequest({
    url: "/api/file-checklist",
    method: "POST",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const updateChecklist = async (id: number, data: EditFileChecklistPayload) => {
  const result = await httpRequest({
    url: `/api/file-checklist/${id}`,
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const deleteChecklist = async (id: number) => {
  const result = await httpRequest({
    url: `/api/file-checklist/${id}`,
    method: "DELETE",
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
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
