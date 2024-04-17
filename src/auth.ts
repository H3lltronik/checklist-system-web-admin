import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { queryClient } from "./components/core/queryClient";

export const LOCAL_STORAGE_TOKEN_KEY = "token";

type CheckTokenParams = {
  showExpiredNotification?: boolean;
};

type CheckTokenResponse = {
  valid: boolean;
  wasStored: boolean;
  user?: {
    email: string;
    permissions: string[];
  };
};

export const getToken = async (): Promise<string | null> => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  if (!storedToken) return null;
  return storedToken;
};

export const checkToken = async (params?: CheckTokenParams): Promise<CheckTokenResponse> => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  if (!storedToken)
    return {
      valid: false,
      wasStored: false,
    };

  const res = await fetch("/api/auth/check-token", {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  if (!res.valid) {
    if (params?.showExpiredNotification) {
      notification.warning({
        message: "La sesión ha expirado, por favor inicia nuevamente",
        duration: 0,
      });
    }
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  return {
    valid: res.valid,
    wasStored: true,
    user: res.user,
  };
};

export const login = async (
  email: string,
  password: string,
): Promise<{ access_token: string } | null> => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());

  if (res.access_token) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, res.access_token);
  } else {
    notification.error({
      message: "Credenciales incorrectas",
    });
    return null;
  }

  return res;
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};

const AUTH_QUERY_KEY = "auth_token";
const AUTH_STATUS_QUERY_KEY = "auth_token_status";

export const checkTokenQueryOptions = queryOptions({
  queryKey: [AUTH_STATUS_QUERY_KEY] as QueryKey,
  staleTime: Infinity,
  refetchOnWindowFocus: true,
  queryFn: () => checkToken(),
});

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY],
    mutationFn: (variables: { email: string; password: string }) =>
      login(variables.email, variables.password),
    onSuccess: () => {
      notification.success({
        message: "Se inició la sesión",
      });

      queryClient.invalidateQueries({
        queryKey: [AUTH_STATUS_QUERY_KEY],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};
