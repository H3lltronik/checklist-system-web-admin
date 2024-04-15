import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import { useCreateUserMutation, useUpdateUserMutation } from "./data/queries";
import { UserForm, UserFormHandle, UserFormReturns } from "./forms/UserForm";

const ManageUserScreenHeader = () => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-2xl">Usuarios</h3>
      </div>
    </div>
  );
};

type Props = {
  defaultValues?: UserFormReturns;
  editMode?: boolean;
};

export const ManageUserScreen: React.FC<Props> = (props) => {
  const formRef = useRef<UserFormHandle>(null);
  const { mutateAsync: updateAsync, isPending: isUpdatePending } = useUpdateUserMutation();
  const { mutateAsync: createAsync, isPending: isCreatePending } = useCreateUserMutation();

  const isPending = isUpdatePending || isCreatePending;

  const onSubmit = async () => {
    const data = await formRef.current?.getFormData();

    if (!data) return;
    if (data.id) {
      updateAsync({
        id: Number(data.id),
        data,
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
      <ManageUserScreenHeader />
      <div className="mt-5">
        <UserForm editMode={props.editMode} ref={formRef} />
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </main>
  );
};
