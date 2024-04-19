import { QueryKeys } from "@/@types/queries";
import { queryClient } from "@/components/core/queryClient";
import { QueryKey, queryOptions, useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import {
  createChecklist,
  deleteChecklist,
  EditFileChecklistPayload,
  getChecklistDetails,
  getChecklistList,
  updateChecklist,
} from "./api";

export const checklistQueryOptions = queryOptions({
  queryKey: [QueryKeys.FILE_CHECKLIST_LIST] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getChecklistList(),
});

export const buildChecklistDetailsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: [QueryKeys.FILE_CHECKLIST_LIST, id] as QueryKey,
    staleTime: 15 * 1000, // 15 segundos
    refetchOnWindowFocus: false,
    queryFn: () => getChecklistDetails(id),
  });

export const useCreateChecklistMutation = () => {
  return useMutation({
    mutationFn: createChecklist,
    onSuccess: () => {
      notification.success({
        message: "Checklist creado correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FILE_CHECKLIST_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useUpdateChecklistMutation = () => {
  return useMutation({
    mutationFn: (variables: { id: number; data: EditFileChecklistPayload }) =>
      updateChecklist(variables.id, variables.data),
    onSuccess: () => {
      notification.success({
        message: "Checklist actualizado correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FILE_CHECKLIST_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};

export const useDeleteChecklistMutation = () => {
  return useMutation({
    mutationFn: deleteChecklist,
    onSuccess: () => {
      notification.success({
        message: "Checklist eliminado correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FILE_CHECKLIST_LIST],
      });
    },
    onError: () => {
      notification.error({
        message: "Ocurrio un error",
      });
    },
  });
};
