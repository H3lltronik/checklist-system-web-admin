import { Assignation } from "@/@types/api/entities";
import { ParsedChecklistItem } from "@/@types/common";
import { bytesToSize } from "@/components/screens/my-assignations/details/lib";
import { notification } from "antd";
import Upload, { RcFile } from "antd/es/upload";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type FileRulesToValidate = {
  maxFiles?: number;
  maxSizeInBytes?: number;
  allowedMimeTypes?: string[];
};

export const buildAssignationFileValidation = (
  params: FileRulesToValidate,
  assignation: Assignation,
  checklistItem: ParsedChecklistItem,
) => {
  return (file: RcFile) => {
    const filesLength =
      assignation.files?.filter((f) => f.checklistItemId == checklistItem.id && f.deletedAt == null)
        .length ?? 0;

    console.log("params", params);
    console.log("assignation", assignation);
    console.log("checklistItem", checklistItem);
    if (filesLength >= (params.maxFiles ?? 1)) {
      notification.info({
        message: "Se ha alcanzado el limite de archivos",
        description: `Se ha alcanzado el limite de archivos permitidos`,
      });
      return false;
    }

    const isLt2M = file.size < (params.maxSizeInBytes ?? MAX_FILE_SIZE);

    const allowedMimeTypes =
      params.allowedMimeTypes?.map((mimeType) => mimeType.toLowerCase()) ?? [];
    const isAllowedMimeType =
      allowedMimeTypes.length == 0 || allowedMimeTypes.includes(file.type.toLowerCase());
    if (!isAllowedMimeType) {
      notification.info({
        message: "Tipo de archivo no permitido",
        description: `Los tipos de archivo permitidos son: ${allowedMimeTypes.join(", ")}`,
      });
    }

    if (!isLt2M) {
      notification.info({
        message: "Archivo muy pesado",
        description: `El archivo debe ser menor a ${bytesToSize(params.maxSizeInBytes ?? MAX_FILE_SIZE)}, el proporcionado es ${bytesToSize(file.size)}`,
      });
    }
    return isLt2M ? true : Upload.LIST_IGNORE;
  };
};
