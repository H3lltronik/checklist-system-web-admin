import { Assignation } from "@/@types/api/entities";
import { ParsedChecklistItem } from "@/@types/common";
import { SizeSuffix } from "@/@types/sizes";
import { ChecklistFileStatus } from "./components/UploadedFilesMetaCard";

export const parseChecklistItems = (data: Assignation): ParsedChecklistItem[] => {
  const checklistItems = [];
  const extraChecklistItemsForOverride = data.extraChecklistItems?.filter((i) => i.overrideChecklistItemId);
  const extraChecklistItems = data.extraChecklistItems?.filter((i) => !i.overrideChecklistItemId);

  if (extraChecklistItems) checklistItems.push(...extraChecklistItems);

  for (const checklistItem of data.fileChecklist?.checklistItems ?? []) {
    const item = { ...checklistItem };
    const extraItem = extraChecklistItemsForOverride?.find((i) => i.overrideChecklistItemId === item.id);
    if (extraItem)
      checklistItems.push({ ...extraItem });
    else checklistItems.push({ ...item });
  }

  return (
    checklistItems.map((item) => ({
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

export const bytesWithSuffix = (bytes: number, sizeSuffix: SizeSuffix) => {
  if (sizeSuffix === SizeSuffix.BYTES) return bytes;
  if (sizeSuffix === SizeSuffix.KILOBYTES) return bytes * 1024;
  if (sizeSuffix === SizeSuffix.MEGABYTES) return bytes * 1024 * 1024;
  if (sizeSuffix === SizeSuffix.GIGABYTES) return bytes * 1024 * 1024 * 1024;
}
