import { Assignation } from "./entities";

export type GetAssignationListResponse = Assignation[];

export type GetAssignationResponse = Assignation;

export type AssignationOverview = {
  id: number;
  name: string;
  enterpriseName: string;
  period: string;
  completedFiles: number;
  totalFiles: number;
  needsAttention: boolean;
  completedPercentage: number;
};

export interface FileUploadedResponse {
  id: number;
  name: string;
  url: string;
  mimetype: string;
  size: number;
  createdAt: string;
}

export type EnterpriseAssignation = {
  id: number;
  name: string;
  assignations: AssignationOverview[];
};

export type GetEnterpriseAssignationListResponse = EnterpriseAssignation[];
