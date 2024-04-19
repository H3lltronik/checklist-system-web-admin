import { QueryKeys } from "@/@types/queries";
import { queryClient } from "@/components/core/queryClient";
import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import {
  createRole,
  deleteRole,
  EditRolePayload,
  getRoleDetails,
  getRoleList,
  updateRole,
} from "./api";

export const roleQueryOptions = queryOptions({
  queryKey: [QueryKeys.ROLE_LIST] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getRoleList(),
});

export const buildRoleDetailsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QueryKeys.ROLE_LIST, id] as QueryKey,
    staleTime: 15 * 1000, // 15 segundos
    refetchOnWindowFocus: false,
    queryFn: () => getRoleDetails(id),
  });

export const useCreateRoleMutation = () => {
  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      notification.success({
        message: "Empresa creada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ROLE_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useUpdateRoleMutation = () => {
  return useMutation({
    mutationFn: (variables: { id: number; data: EditRolePayload }) =>
      updateRole(variables.id, variables.data),
    onSuccess: () => {
      notification.success({
        message: "Empresa actualizada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ROLE_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useDeleteRoleMutation = () => {
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      notification.success({
        message: "Empresa eliminada correctamente",
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ROLE_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};
