import { QueryKeys } from "@/@types/queries";
import { queryClient } from "@/components/core/queryClient";
import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import {
  acceptUploadedFile,
  createAssignation,
  deleteAssignation,
  EditAssignationPayload,
  getAssignationDetails,
  getAssignationList,
  RejectUploadedFile,
  rejectUploadedFile,
  updateAssignation
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
        // checklistItems: data.checklistItems.map((item) => ({
        //   ...item,
        //   uploadedFiles: item.uploadedFiles.map((file) => ({
        //     ...file,
        //     upload: {
        //       ...file.upload,
        //       url: `/api/files/${file.upload.slug}`,
        //     }
        //   })),
        // }))
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

export const useAdminAssignationFilesMutation = (assignationId: number) => {
  const acceptFileMutation = useMutation({
    mutationFn: (uploadedFileId: number) => acceptUploadedFile({ uploadedFileId, assignationId, comment: 'Archivo aceptado por usuario' }),
    onSuccess: () => {
      notification.success({ message: "Archivo aceptado correctamente" });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ASSIGNATION_LIST, assignationId] });
    },
    onError: () => {
      notification.error({ message: "Ocurrio un error" });
    },
  });

  const rejectFileMutation = useMutation({
    mutationFn: (variables: Omit<RejectUploadedFile, 'assignationId'>) => rejectUploadedFile({ ...variables, assignationId }),
    onSuccess: () => {
      notification.success({ message: "Archivo rechazado correctamente" });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ASSIGNATION_LIST, assignationId] });
    },
    onError: () => {
      notification.error({ message: "Ocurrio un error" });
    },
  })

  return {
    acceptFileMutation,
    rejectFileMutation
  }
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
