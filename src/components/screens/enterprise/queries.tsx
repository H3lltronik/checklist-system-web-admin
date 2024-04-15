import { queryClient } from "@/components/core/queryClient";
import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import {
  createEnterprise,
  deleteEnterprise,
  EditEnterprisePayload,
  getEnterpriseDetails,
  getEnterpriseList,
  updateEnterprise,
} from "./api";

export const ENTERPRISE_LIST_QUERY_KEY = "enterprise_list";

export const enterpriseQueryOptions = queryOptions({
  queryKey: [ENTERPRISE_LIST_QUERY_KEY] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getEnterpriseList(),
});

export const buildEnterpriseDetailsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [ENTERPRISE_LIST_QUERY_KEY, id] as QueryKey,
    staleTime: 15 * 1000, // 15 segundos
    refetchOnWindowFocus: false,
    queryFn: () => getEnterpriseDetails(id),
  });

export const useCreateEnterpriseMutation = () => {
  return useMutation({
    mutationFn: createEnterprise,
    onSuccess: () => {
      notification.success({
        message: "Empresa creada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [ENTERPRISE_LIST_QUERY_KEY],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useUpdateEnterpriseMutation = () => {
  return useMutation({
    mutationFn: (variables: { id: number; data: EditEnterprisePayload }) =>
      updateEnterprise(variables.id, variables.data),
    onSuccess: () => {
      notification.success({
        message: "Empresa actualizada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [ENTERPRISE_LIST_QUERY_KEY],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useDeleteEnterpriseMutation = () => {
  return useMutation({
    mutationFn: deleteEnterprise,
    onSuccess: () => {
      notification.success({
        message: "Empresa eliminada correctamente",
      });
      queryClient.invalidateQueries({
        queryKey: [ENTERPRISE_LIST_QUERY_KEY],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};
