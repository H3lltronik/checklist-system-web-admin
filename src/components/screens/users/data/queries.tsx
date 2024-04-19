import { QueryKeys } from "@/@types/queries";
import { queryClient } from "@/components/core/queryClient";
import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import {
  createUser,
  deleteUser,
  EditUserPayload,
  getUserDetails,
  getUserList,
  getUserProfileByEmail,
  updateUser,
} from "./api";

export const userQueryOptions = queryOptions({
  queryKey: [QueryKeys.USER_LIST] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getUserList(),
});

export const buildUserDetailsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QueryKeys.USER_LIST, id] as QueryKey,
    staleTime: 15 * 1000, // 15 segundos
    refetchOnWindowFocus: false,
    queryFn: () => getUserDetails(id),
  });

export const buildUserProfileByEmailQueryOptions = (email: string | undefined) =>
  queryOptions({
    queryKey: [QueryKeys.USER_LIST, email] as QueryKey,
    staleTime: 15 * 1000, // 15 segundos
    refetchOnWindowFocus: false,
    queryFn: () => (email ? getUserProfileByEmail(email) : undefined),
  });

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      notification.success({
        message: "Asignación creada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (variables: { id: number; data: EditUserPayload }) =>
      updateUser(variables.id, variables.data),
    onSuccess: () => {
      notification.success({
        message: "Asignación actualizada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      notification.success({
        message: "Asignación eliminada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};
