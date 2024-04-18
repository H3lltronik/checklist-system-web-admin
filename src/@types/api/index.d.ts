export type RequestParams = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: string;
  headers?: Record<string, string>;
};

export type ApiResponse<T> = {
  error: boolean;
  data: T | null;
  errorMessage?: string;
  status?: number;
};
