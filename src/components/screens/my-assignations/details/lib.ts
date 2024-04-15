import { Assignation } from "@/@types/api/entities";
import { ParsedChecklistItem } from "@/@types/common";
import { ChecklistFileStatus } from "./components/UploadedFilesMetaCard";

export const parseChecklistItems = (data: Assignation): ParsedChecklistItem[] => {
  return (
    data.fileChecklist.checklistItems?.map((item) => ({
      ...item,
      uploadedFiles: data.files.filter((file) => file.checklistItemId === item.id),
      deletedFiles: data.files.filter((file) => file.checklistItemId === item.id && file.deletedAt),
      acceptedFiles: data.files.filter(
        (file) =>
          file.checklistItemId === item.id &&
          file.deletedAt === null &&
          file.assignationUploadedFileStatusId === ChecklistFileStatus.ACCEPTED,
      ),
      rejectedFiles: data.files.filter(
        (file) =>
          file.checklistItemId === item.id &&
          file.assignationUploadedFileStatusId === ChecklistFileStatus.REJECTED &&
          file.deletedAt === null,
      ),
      pendingFiles: data.files.filter(
        (file) =>
          file.checklistItemId === item.id &&
          file.deletedAt === null &&
          file.assignationUploadedFileStatusId !== ChecklistFileStatus.REJECTED &&
          file.assignationUploadedFileStatusId !== ChecklistFileStatus.ACCEPTED,
      ),
    })) ?? []
  );
};

export const bytesToSize = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};
