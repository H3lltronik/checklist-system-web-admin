import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { notification } from "antd";
import { MutationKeys, QueryKeys } from "./@types/queries";
import { queryClient } from "./components/core/queryClient";
import { httpRequest } from "./http/http-client";

export const LOCAL_STORAGE_TOKEN_KEY = "token";

type CheckTokenParams = {
  showExpiredNotification?: boolean;
};

export type CheckTokenResponse = {
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

type SuccessfulLoginResponse = {
  access_token: string;
}

export type ChallengeName = "EMAIL_OTP" | "SOFTWARE_TOKEN_MFA" | "CUSTOM_CHALLENGE";

export type ChallengeLoginResponse = {
  message: string;
  challenge: ChallengeName | undefined;
  session: string | undefined;
  destination: string | undefined;
}

type LoginResponse = SuccessfulLoginResponse | ChallengeLoginResponse;

export const loginRequest = async (email: string, password?: string): Promise<LoginResponse> => {
  const res = await httpRequest<LoginResponse>({
    url: "/api/auth/login",
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (res.error || !res.data || res.errorMessage) throw new Error(res.errorMessage);

  return res.data;
};

export const hasPasswordRequest = async (email: string): Promise<{ hasPassword: boolean }> => {
  const url = new URL("/api/auth/has-password", window.location.origin);
  url.searchParams.append("email", email);
  const res = await httpRequest<{ hasPassword: boolean }>({
    url: url.toString(),
    method: "GET",
  });

  if (res.error || !res.data || res.errorMessage) throw new Error(res.errorMessage);

  return res.data;
};

export type VerifyMFAParams = {
  session: string;
  code: string;
  email: string;
  challenge: ChallengeName;
}

export const verifyMFA = async (params: VerifyMFAParams): Promise<SuccessfulLoginResponse> => {
  const res = await httpRequest<SuccessfulLoginResponse>({
    url: "/api/auth/verify-mfa",
    method: "POST",
    body: JSON.stringify(params),
  });

  if (res.error || !res.data || res.errorMessage) throw new Error(res.errorMessage);

  return res.data;
};

export const verifyOTP = async (params: Omit<VerifyMFAParams, 'challenge'>): Promise<SuccessfulLoginResponse> => {
  const res = await httpRequest<SuccessfulLoginResponse>({
    url: "/api/auth/verify-otp",
    method: "POST",
    body: JSON.stringify(params),
  });

  if (res.error || !res.data || res.errorMessage) throw new Error(res.errorMessage);

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

export const buildCheckHasPassword = (email: string) => queryOptions({
  queryKey: [QueryKeys.CHECK_HAS_PASSWORD] as QueryKey,
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  enabled: email !== undefined && email.length > 0,
  queryFn: () => hasPasswordRequest(email),
});

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: [QueryKeys.AUTH_QUERY_KEY],
    mutationFn: async (variables: { email: string; password?: string }) => {
      const response = await loginRequest(variables.email, variables.password)

      if ("access_token" in response) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.access_token);
      }

      return response;
    },
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

export const useVerifyMFAMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [MutationKeys.AUTH_VERIFY_MFA],
    mutationFn: async (variables: { session: string; code: string, email: string, challenge: ChallengeName }) => {
      const params = {
        code: variables.code,
        session: variables.session,
        email: variables.email,
      }

      if (variables.challenge === "CUSTOM_CHALLENGE") {
        return await verifyOTP(params);
      } else {
        return await verifyMFA({ ...params, challenge: variables.challenge });
      }

    },
    onSuccess: (response) => {
      notification.success({
        message: 'Autenticación MFA exitosa, redirigiendo...',
      });

      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.access_token);

      navigate({ to: "/" });
    },
    onError: () => {
      notification.error({
        message: 'Código MFA incorrecto, por favor inténtalo de nuevo',
      });
    },
  });
};