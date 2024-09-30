export type Permission = {
  id: number;
  actionId: number;
  action: Action;
  subjectId: number;
  subject: Subject;
  roleId: number;
};

export type Locales = "en" | "es";

export type Action = {
  id: number;
  name: string;
  descriptions: Record<Locales, string>;
};

export enum SubjectType {
  FRONTEND = "frontend",
  BACKEND = "backend",
}

export type Subject = {
  id: number;
  name: string;
  type: SubjectType;
  descriptions: Record<Locales, string>;
};

export type Credential = {
  id: number;
  email: string;
  password: string;
  roleId: number;
  role: Role;
  hasPassword: boolean;
  mfaEnabled: boolean;
  permissions: Permission[];
};

export type User = {
  id: number;
  name: string;
  pictureUrl: string;
  isActive: boolean;
  enterprises?: Enterprise[];
  credentials: Credential[];
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
  minFiles: number;
  maxSize: number;
  sizeSuffix: SizeSuffix;
  allowedMimeTypes: string[];
}

export interface ExtraChecklistItem {
  id: number;
  title: string;
  description: string;
  allowMultiple: boolean;
  maxFiles: number;
  minFiles: number;
  maxSize: number;
  sizeSuffix: SizeSuffix;
  allowedMimeTypes: string[];
  assignationId: number;
  assignation: Assignation;
  overrideChecklistItemId: number;
  overrideChecklistItem: ChecklistItem;
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
  extraChecklistItems: ExtraChecklistItem[];
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
