import { Assignation } from "./entities";

export type GetAssignationListResponse = Assignation[];

export type GetAssignationResponse = Assignation;

enum ChecklistType {
  CHECKLIST_ITEM = "CHECKLIST_ITEM",
  EXTRA_CHECKLIST_ITEM = "EXTRA_CHECKLIST_ITEM",
}

export type GetEnterpriseAssignationResponse = {
  id: number;
  name: string;
  description: string;
  enterprise: {
    id: number;
    name: string;
    rfc: string;
    email: string;
  };
  fileChecklist: {
    id: number;
    title: string;
    description: string;
    checklistItemsCount: number;
  };
  period: {
    name: string;
    year: number;
  };
  checklistItems: {
    id: number;
    title: string;
    description: string;
    maxFiles: number;
    minFiles?: number;
    maxSize: number;
    sizeSuffix: string;
    allowedMimeTypes: string[];
    checklistItemType: ChecklistType;
    uploadedFiles: {
      assignationId: number;
      checklistItemId: number;
      checklistItemType: string;
      id: number;
      uploadedFileId: number;
      comment: string;
      deletedAt: string;
      status: {
        date: string;
        event: string;
        comment: string;
      };
      upload: {
        id: number;
        name: string;
        mimeType: string;
        slug: string;
        size: number;
        createdAt: string;
      };
    }[];
    overrideChecklistItemId: number;
    progress: number;
  }[];
  progress: number;
};

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