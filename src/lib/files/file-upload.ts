import { getToken } from "@/auth";
import { notification } from "antd";
import { saveAs } from "file-saver";

export type RcCustomRequestOptions = {
  onSuccess: (response: unknown, file: unknown) => void;
  onError: (error: unknown) => void;
  file: unknown;
  url?: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
};

export const fileUploadRequestWithToken = async (options: RcCustomRequestOptions) => {
  const { onSuccess, onError, file } = options;
  const url = options.url ?? "/api/files/upload";
  const method = options.method ?? "POST";

  const token = await getToken();

  const formData = new FormData();
  formData.append("file", file as Blob);

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    const result = await response.json();

    onSuccess(result, file);
  } catch (error: unknown) {
    console.error("Error uploading file:", error);
    onError(error);
  }
};

export const downloadFileBySlug = async (slug: string) => {
  try {
    const token = await getToken();
    const response = await fetch(`/api/files/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      notification.error({
        message: "Ocurrio un error, no se pudo descargar el archivo",
      });
      console.log("Download failed:", response.status, response.statusText);
      return;
    }

    const blob = await response.blob();
    const filename = slug.replace(/__$/, "");
    saveAs(blob, filename);

    notification.success({
      message: "Archivo descargado correctamente",
    });
  } catch (err) {
    console.error("Download failed:", err);
    notification.error({
      message: "Ocurrio un error, no se pudo descargar el archivo",
    });
  }
};
