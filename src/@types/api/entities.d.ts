export type Permission = {
  id: number;
  actionId: number;
  action: Action;
  subjectId: number;
  subject: Subject;
  roleId: number;
};

export type Action = {
  id: number;
  name: string;
};

export type Subject = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  email: string;
  password: string;
  isActive: boolean;
  roleId: number;
  role: Role;
  enterprises?: Enterprise[];
};

export type Role = {
  id: number;
  name: string;
  isActive: boolean;
};

export interface FileChecklist {
  id: number;
  title: string;
  description: string;
  checklistItems: ChecklistItem[];
}

export interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  allowMultiple: boolean;
  maxFiles: number;
  maxSizeInBytes: number;
  allowedMimeTypes: string[];
}

export interface Enterprise {
  id: number;
  name: string;
  rfc: string;
  phone: string;
  email: string;
  postalCode: string;
  streetName: string;
  streetType: string;
  exteriorNumber: string;
  interiorNumber: string;
  neighborhood: string;
  locationName: string;
  municipality: string;
  state: string;
  betweenStreets: string;
  userId: number;
  users?: User;
}

export interface Period {
  id: number;
  name: string;
  year: number;
}

export interface Assignation {
  id: number;
  name: string;
  description: string;
  periodId: number;
  period: Period;
  enterpriseId: number;
  enterprise: Enterprise;
  fileChecklistId: number;
  fileChecklist: FileChecklist;
  files: AssignationUploadedFile[];
}

export interface AssignationUploadedFile {
  id: number;
  assignationId: number;
  uploadedFileId: number;
  uploadedFile: UploadedFile;
  checklistItemId: number;
  deletedAt: string | null;
  assignationUploadedFileStatusId: number;
  assignationUploadedFileStatus: AssignationUploadedFileStatus;
  comment: string;
}

export interface UploadedFile {
  id: number;
  name: string;
  url: string;
  mimetype: string;
  size: number;
  createdAt: string;
  slug: string;
}
