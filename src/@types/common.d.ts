import { Rule } from "antd/es/form";
import { IFuseOptions } from "fuse.js";
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

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type FuseOptionsWithKeys<U extends object> = Omit<IFuseOptions<U>, 'keys'> & {
  keys: Array<NestedKeyOf<U>>;
};