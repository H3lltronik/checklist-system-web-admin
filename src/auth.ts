import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { QueryKeys } from "./@types/queries";
import { queryClient } from "./components/core/queryClient";
import { httpRequest } from "./http/http-client";

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

type LoginResponse = { access_token: string };

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await httpRequest<LoginResponse>({
    url: "/api/auth/login",
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (res.error || !res.data || res.errorMessage) throw new Error(res.errorMessage);

  const access_token = res.data.access_token;

  if (access_token) localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, access_token);
  else throw new Error("No access token provided");

  return res.data;
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};

export const checkTokenQueryOptions = queryOptions({
  queryKey: [QueryKeys.AUTH_STATUS_QUERY_KEY] as QueryKey,
  staleTime: Infinity,
  refetchOnWindowFocus: true,
  queryFn: () => checkToken(),
});

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: [QueryKeys.AUTH_QUERY_KEY],
    mutationFn: (variables: { email: string; password: string }) =>
      login(variables.email, variables.password),
    onSuccess: () => {
      notification.success({
        message: "Se inició la sesión",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.AUTH_STATUS_QUERY_KEY],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};
