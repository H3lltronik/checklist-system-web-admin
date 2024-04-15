import { queryClient } from "@/components/core/queryClient";
import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import {
  createUser,
  deleteUser,
  EditUserPayload,
  getUserDetails,
  getUserList,
  updateUser,
} from "./api";

export const USER_LIST_QUERY_KEY = "user_list";

export const userQueryOptions = queryOptions({
  queryKey: [USER_LIST_QUERY_KEY] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getUserList(),
});

export const buildUserDetailsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [USER_LIST_QUERY_KEY, id] as QueryKey,
    staleTime: 15 * 1000, // 15 segundos
    refetchOnWindowFocus: false,
    queryFn: () => getUserDetails(id),
  });

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      notification.success({
        message: "Asignación creada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [USER_LIST_QUERY_KEY],
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
        queryKey: [USER_LIST_QUERY_KEY],
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
        queryKey: [USER_LIST_QUERY_KEY],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};
