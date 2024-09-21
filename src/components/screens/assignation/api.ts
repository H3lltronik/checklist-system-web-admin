import { GetAssignationListResponse, GetAssignationResponse } from "@/@types/api/assignation";
import { httpRequest } from "@/http/http-client";

export const getAssignationList = async () => {
  const result = await httpRequest<GetAssignationListResponse>({
    url: "/api/assignation",
    method: "GET",
  });

  return result.data;
};

export const getAssignationDetails = async (id: number) => {
  const result = await httpRequest<GetAssignationResponse>({
    url: `/api/assignation/${id}`,
    method: "GET",
  });

  return result.data;
};

export const createAssignation = async (data: AssignationPayload) => {
  const result = await httpRequest({
    url: "/api/assignation",
    method: "POST",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const updateAssignation = async (id: number, data: EditAssignationPayload) => {
  const result = await httpRequest({
    url: `/api/assignation/${id}`,
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const updateAssignationFileStatus = async (
  fileId: number,
  data: UpdateAssignationFileStatusPayload,
) => {
  const result = await httpRequest({
    url: `/api/assignation/update-file-status/${fileId}`,
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export const deleteAssignation = async (id: number) => {
  const result = await httpRequest({
    url: `/api/assignation/${id}`,
    method: "DELETE",
  });

  if (result.error) throw new Error(result.errorMessage);
  return result.data;
};

export interface AssignationPayload {
  name: string;
  description: string;
  periodId: number;
  enterpriseId: number;
  fileChecklistId: number;
  extraChecklistItems?: {
    title: string;
    description: string;
    allowMultiple: boolean;
    maxSizeInBytes: number;
    allowedMimeTypes: string[];
    maxFiles?: number;
    assignationId?: number;
    overrideChecklistId?: number;
  }[];
}

export interface EditAssignationPayload extends AssignationPayload {
  id: number;
}

export interface UpdateAssignationFileStatusPayload {
  assignationUploadedFileStatusId: number;
  comment: string;
}
