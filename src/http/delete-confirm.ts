import { AppQueries } from "@/@types/queries";
import { queryClient } from "@/components/core/queryClient";
import { Modal } from "antd";

interface DeleteConfirmParams {
  title: string;
  content: string;
  deleteFn: (id: number) => Promise<unknown>;
  recordId: number;
  queryKey: AppQueries;
}

export const deleteConfirm = async ({
  title,
  content,
  deleteFn,
  recordId,
  queryKey,
}: DeleteConfirmParams) => {
  Modal.confirm({
    title: title,
    content: content,
    onOk: async () => {
      await deleteFn(recordId);
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
  });
};
