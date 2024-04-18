import { ApiResponse } from "@/@types/api";
import { message } from "antd";

export const handleApiError = (response: ApiResponse<unknown>) => {
  if (!response.error) return;

  if (response.status === 401) {
    message.error("La sesión ha expirado, por favor inicia nuevamente");
    return;
  }

  if (Array.isArray(response.errorMessage)) {
    for (const error of response.errorMessage) {
      message.error(error);
    }
    return;
  }

  if (response.errorMessage) {
    message.error(response.errorMessage);
    return;
  }

  console.error("Error not handled", response);
};
