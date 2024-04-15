import { Rule } from "antd/es/form";
import { AssignationUploadedFile, ChecklistItem } from "./api/entities";

export interface ParsedChecklistItem extends ChecklistItem {
  uploadedFiles?: AssignationUploadedFile[];
  deletedFiles?: AssignationUploadedFile[];
  rejectedFiles?: AssignationUploadedFile[];
  pendingFiles?: AssignationUploadedFile[];
  acceptedFiles?: AssignationUploadedFile[];
}

export type FormRules<T> = {
  [P in keyof T]: Rule[];
};

export type FileSizeSuffix = "bytes" | "KB" | "MB" | "GB";
