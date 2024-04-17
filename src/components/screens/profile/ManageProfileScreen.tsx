import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import { RolePayload } from "./data/role/api";
import { useCreateRoleMutation, useUpdateRoleMutation } from "./data/role/queries";
import { RoleForm, RoleFormBody, RoleFormHandle } from "./form/ProfileForm";

const ManageRoleScreenHeader = () => {
  return (
    <div className="px-5 w-full flex">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-2xl">Perfiles</h3>
      </div>
    </div>
  );
};

type Props = {
  defaultValues?: RoleFormBody;
  id?: number;
};

export const ManageRoleScreen: React.FC<Props> = (props) => {
  const formRef = useRef<RoleFormHandle>(null);
  const { mutateAsync: updateAsync, isPending: isUpdatePending } = useUpdateRoleMutation();
  const { mutateAsync: deleteAsync, isPending: isCreatePending } = useCreateRoleMutation();
  const isPending = isUpdatePending || isCreatePending;

  const onSubmit = async () => {
    const data = await formRef.current?.getFormData();
    console.log("[ManageProfileScreen] data", data);

    if (!data) return;
    if (data.id) {
      updateAsync({ id: Number(data.id), data: data });
    } else {
      deleteAsync(data as RolePayload);
    }
  };

  useEffect(() => {
    if (props.defaultValues) formRef.current?.setFormData(props.defaultValues);
  }, [formRef, props.defaultValues]);

  return (
    <main className="relative">
      <AbsoluteCenteredLoader isLoading={isPending} />

      <ManageRoleScreenHeader />
      <div className="mt-5">
        <RoleForm ref={formRef} />
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </main>
  );
};
