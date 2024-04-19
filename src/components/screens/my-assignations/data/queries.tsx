import { QueryKeys } from "@/@types/queries";
import { queryClient } from "@/components/core/queryClient";
import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import {
  AddFileAssignation,
  addFilesToAssignation,
  getEnterpriseAssignations,
  getEnterpriseAssignationsDetails,
  removeFileFromAssignation,
} from "./api";

export const enterpriseAssignationDetailsQueryOptions = () =>
  queryOptions({
    queryKey: [QueryKeys.ENTERPRISE_ASSIGNATIONS_LIST] as QueryKey,
    staleTime: 15 * 1000, // 15 segundos
    refetchOnWindowFocus: false,
    queryFn: () => getEnterpriseAssignations(),
  });

export const buildEnterpriseAssignationDetailsQueryOptions = (assignationId: number) =>
  queryOptions({
    queryKey: [QueryKeys.ENTERPRISE_ASSIGNATIONS_LIST, assignationId] as QueryKey,
    staleTime: 15 * 1000, // 15 segundos
    refetchOnWindowFocus: false,
    queryFn: () => getEnterpriseAssignationsDetails(assignationId),
  });

export const useAddFilesToAssignationMutation = (assignationId: number) => {
  return useMutation({
    mutationKey: [QueryKeys.ENTERPRISE_ASSIGNATIONS_LIST, assignationId] as QueryKey,
    mutationFn: (variables: { files: AddFileAssignation[] }) => addFilesToAssignation(variables),
    onSuccess: () => {
      notification.success({
        message: `Se cargo correctamente los archivos en assignation ${assignationId}`,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ENTERPRISE_ASSIGNATIONS_LIST, assignationId],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useRemoveFileToAssignationMutation = (assignationId: number) => {
  return useMutation({
    mutationKey: [QueryKeys.ENTERPRISE_ASSIGNATIONS_LIST, assignationId] as QueryKey,
    mutationFn: (variables: { assignationUploadedFileId: number }) =>
      removeFileFromAssignation({ assignationId, ...variables }),
    onSuccess: () => {
      notification.success({
        message: `Se elimino correctamente el archivo de assignation ${assignationId}`,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ENTERPRISE_ASSIGNATIONS_LIST, assignationId],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};
