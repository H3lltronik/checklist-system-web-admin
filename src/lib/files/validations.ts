import { SizeSuffix } from "@/@types/sizes";
import { bytesToSize, bytesWithSuffix } from "@/components/screens/my-assignations/details/lib";
import { notification } from "antd";
import Upload, { RcFile } from "antd/es/upload";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type FileRulesToValidate = {
  sizeSuffix?: SizeSuffix;
  maxFiles?: number;
  maxSize?: number;
  allowedMimeTypes?: string[];
};

export const buildAssignationFileValidation = (
  params: FileRulesToValidate,
  filesLength: number,
) => {
  return (file: RcFile) => {
    if (filesLength >= (params.maxFiles ?? 1)) {
      notification.info({
        message: "Se ha alcanzado el limite de archivos",
        description: `Se ha alcanzado el limite de archivos permitidos`,
      });
      return false;
    }

    const maxSize = bytesWithSuffix(params.maxSize ?? MAX_FILE_SIZE, params.sizeSuffix ?? SizeSuffix.BYTES);
    let isLt2M = true;
    if (maxSize !== undefined && maxSize > 0)
      isLt2M = file.size < maxSize;

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
        description: `El archivo debe ser menor a ${bytesToSize(maxSize ?? 0)}, el proporcionado es ${bytesToSize(file.size)}`,
      });
    }
    return isLt2M ? true : Upload.LIST_IGNORE;
  };
};
