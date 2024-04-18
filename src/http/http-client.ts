import { ApiResponse, RequestParams } from "@/@types/api";
import { getToken } from "@/auth";
import { handleApiError } from "./error-handler";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const makeRequest = async <T>(params: RequestParams): Promise<ApiResponse<T>> => {
  const token = await getToken();
  const authHeader = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(params.url, {
      method: params.method,
      headers: { ...defaultHeaders, ...params.headers, ...authHeader },
      body: params.body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        return {
          error: true,
          data: null,
          errorMessage: errorData.message || "API error occurred",
          status: response.status,
        };
      } catch {
        return {
          error: true,
          data: null,
          errorMessage: errorText,
          status: response.status,
        };
      }
    }

    const data: T = await response.json();

    return {
      error: false,
      data: data,
    };
  } catch (error) {
    return {
      error: true,
      data: null,
      errorMessage: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export const httpRequest = async <T>(params: RequestParams): Promise<ApiResponse<T>> => {
  const result = await makeRequest<T>(params);

  if (result.error) handleApiError(result);
  return result;
};
