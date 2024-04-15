import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import {
  AssignationForm,
  AssignationFormBody,
  AssignationFormHandle,
} from "./forms/AssignationForm";
import { useCreateAssignationMutation, useUpdateAssignationMutation } from "./queries";

const ManageAssignationScreenHeader = () => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-2xl">Asignaciones</h3>
      </div>
    </div>
  );
};

type Props = {
  defaultValues?: AssignationFormBody;
};

export const ManageAssignationScreen: React.FC<Props> = (props) => {
  const formRef = useRef<AssignationFormHandle>(null);
  const { mutateAsync: updateAsync, isPending: isUpdatePending } = useUpdateAssignationMutation();
  const { mutateAsync: createAsync, isPending: isCreatePending } = useCreateAssignationMutation();

  const isPending = isUpdatePending || isCreatePending;

  const onSubmit = async () => {
    const data = await formRef.current?.getFormData();

    if (!data) return;
    if (data.id) {
      updateAsync({
        id: Number(data.id),
        data: {
          id: Number(data.id),
          name: data.name,
          description: data.description,
          periodId: data.periodId,
          enterpriseId: data.enterpriseId,
          fileChecklistId: data.fileChecklistId,
        },
      });
    } else {
      createAsync(data);
    }
  };

  useEffect(() => {
    if (props.defaultValues) formRef.current?.setFormData(props.defaultValues);
  }, [formRef, props.defaultValues]);

  return (
    <main className="relative">
      <AbsoluteCenteredLoader isLoading={isPending} />
      <ManageAssignationScreenHeader />
      <div className="mt-5">
        <AssignationForm ref={formRef} />
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </main>
  );
};
