import {
  GetAssignationResponse,
  GetEnterpriseAssignationListResponse,
} from "@/@types/api/assignation";
import { httpRequest } from "@/http/http-client";

export const getEnterpriseAssignations = async () => {
  const result = await httpRequest<GetEnterpriseAssignationListResponse>({
    url: "/api/my-assignations/",
    method: "GET",
  });

  return result.data;
};

export const getEnterpriseAssignationsDetails = async (assignationId: number) => {
  const result = await httpRequest<GetAssignationResponse>({
    url: `/api/my-assignations/${assignationId}`,
    method: "GET",
  });

  return result.data;
};

export type AddFileAssignation = {
  assignationId: number;
  uploadedFileId: number;
  checklistItemId: number;
};

export const addFilesToAssignation = async (params: { files: AddFileAssignation[] }) => {
  const response = await httpRequest({
    url: "/api/my-assignations/add-files",
    method: "POST",
    body: JSON.stringify(params),
  });

  if (response.error) throw new Error(response.errorMessage);
  return response.data;
};

export const removeFileFromAssignation = async (params: {
  assignationId: number;
  assignationUploadedFileId: number;
}) => {
  const response = await httpRequest({
    url: "/api/my-assignations/remove-file",
    method: "DELETE",
    body: JSON.stringify(params),
  });

  if (response.error) throw new Error(response.errorMessage);
  return response.data;
};
