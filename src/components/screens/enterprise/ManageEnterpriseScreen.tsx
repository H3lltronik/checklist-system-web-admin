import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import { EnterprisePayload } from "./api";
import { EnterpriseForm, EnterpriseFormBody, EnterpriseFormHandle } from "./forms/EnterpriseForm";
import { useCreateEnterpriseMutation, useUpdateEnterpriseMutation } from "./queries";

const ManageEnterpriseScreenHeader = () => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-2xl">Empresas</h3>
      </div>
    </div>
  );
};

type Props = {
  defaultValues?: EnterpriseFormBody;
};

export const ManageEnterpriseScreen: React.FC<Props> = (props) => {
  const formRef = useRef<EnterpriseFormHandle>(null);
  const { mutateAsync: updateAsync, isPending: isUpdatePending } = useUpdateEnterpriseMutation();
  const { mutateAsync: deleteAsync, isPending: isCreatePending } = useCreateEnterpriseMutation();
  const isPending = isUpdatePending || isCreatePending;

  const onSubmit = async () => {
    const data = await formRef.current?.getFormData();
    console.log("[ManageEnterpriseScreen] data", data);

    if (!data) return;
    if (data.id) {
      updateAsync({ id: Number(data.id), data: data });
    } else {
      deleteAsync(data as EnterprisePayload);
    }
  };

  useEffect(() => {
    if (props.defaultValues) formRef.current?.setFormData(props.defaultValues);
  }, [formRef, props.defaultValues]);

  return (
    <main className="relative">
      <AbsoluteCenteredLoader isLoading={isPending} />

      <ManageEnterpriseScreenHeader />
      <div className="mt-5">
        <EnterpriseForm ref={formRef} />
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </main>
  );
};
