import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import { FileChecklistPayload } from "./api";
import { useCreateChecklistMutation, useUpdateChecklistMutation } from "./checklist-queries";
import {
  FileChecklistForm,
  FileChecklistFormBody,
  FileChecklistFormHandle,
} from "./forms/FileChecklistForm";

const ManageChecklistScreenHeader = () => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-2xl">Requerimientos (Checklists)</h3>
      </div>
    </div>
  );
};

type Props = {
  defaultValues?: FileChecklistFormBody;
};

export const ManageChecklistScreen: React.FC<Props> = (props) => {
  const formRef = useRef<FileChecklistFormHandle>(null);
  const { mutateAsync: updateAsync, isPending: isUpdatePending } = useUpdateChecklistMutation();
  const { mutateAsync: deleteAsync, isPending: isCreatePending } = useCreateChecklistMutation();
  const isPending = isUpdatePending || isCreatePending;

  const onSubmit = async () => {
    const data = await formRef.current?.getFormData();
    console.log("[ManageChecklistScreen] data", data);

    if (!data) return;
    if (data.id) {
      // @ts-expect-error TODO: fix this
      updateAsync({ id: Number(data.id), data: data });
    } else {
      deleteAsync(data as FileChecklistPayload);
    }
  };

  useEffect(() => {
    if (props.defaultValues) formRef.current?.setFormData(props.defaultValues);
  }, [formRef, props.defaultValues]);

  return (
    <main className="relative">
      <AbsoluteCenteredLoader isLoading={isPending} />
      <ManageChecklistScreenHeader />
      <div className="mt-5">
        <FileChecklistForm ref={formRef} />
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </main>
  );
};
