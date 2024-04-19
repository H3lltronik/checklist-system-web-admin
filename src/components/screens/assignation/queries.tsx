import { QueryKeys } from "@/@types/queries";
import { queryClient } from "@/components/core/queryClient";
import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import {
  createAssignation,
  deleteAssignation,
  EditAssignationPayload,
  getAssignationDetails,
  getAssignationList,
  updateAssignation,
  updateAssignationFileStatus,
  UpdateAssignationFileStatusPayload,
} from "./api";

export const assignationQueryOptions = queryOptions({
  queryKey: [QueryKeys.ASSIGNATION_LIST] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getAssignationList(),
});

export const buildAssignationDetailsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QueryKeys.ASSIGNATION_LIST, id] as QueryKey,
    staleTime: 15 * 1000, // 15 segundos
    refetchOnWindowFocus: false,
    queryFn: () => getAssignationDetails(id),
    select: (data) => {
      if (!data) return data;

      return {
        ...data,
        files: data.files.map((file) => ({
          ...file,
          uploadedFile: {
            ...file.uploadedFile,
            url: `/api/files/${file.uploadedFile.slug}`,
          },
        })),
      };
    },
  });

export const useCreateAssignationMutation = () => {
  return useMutation({
    mutationFn: createAssignation,
    onSuccess: () => {
      notification.success({
        message: "Asignación creada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ASSIGNATION_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useUpdateAssignationMutation = () => {
  return useMutation({
    mutationFn: (variables: { id: number; data: EditAssignationPayload }) =>
      updateAssignation(variables.id, variables.data),
    onSuccess: () => {
      notification.success({
        message: "Asignación actualizada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ASSIGNATION_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useUpdateAssignationFileStatusMutation = (assignationId: number) => {
  return useMutation({
    mutationFn: (variables: { id: number; data: UpdateAssignationFileStatusPayload }) =>
      updateAssignationFileStatus(variables.id, variables.data),
    onSuccess: () => {
      notification.success({
        message: "Status del archivo actualizado correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ASSIGNATION_LIST, assignationId],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useDeleteAssignationMutation = () => {
  return useMutation({
    mutationFn: deleteAssignation,
    onSuccess: () => {
      notification.success({
        message: "Asignación eliminada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ASSIGNATION_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};
