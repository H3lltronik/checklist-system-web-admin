import { QueryKeys } from "@/@types/queries";
import { checkTokenQueryOptions } from "@/auth";
import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { AvatarChanger } from "@/components/core/AvatarChanger/AvatarChanger";
import { queryClient } from "@/components/core/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import { useCreateUserMutation, useUpdateUserMutation } from "./data/queries";
import { UserForm, UserFormHandle, UserFormReturns } from "./forms/UserForm";

const ManageUserScreenHeader = ({ name }: { name: string | undefined }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-2xl">Usuarios ({name})</h3>
      </div>
    </div>
  );
};

type Props = {
  defaultValues?: Omit<UserFormReturns, "repeatPassword">;
  editMode?: boolean;
};

export const ManageUserScreen: React.FC<Props> = (props) => {
  const formRef = useRef<UserFormHandle>(null);
  const looseParams = useParams({ strict: false }) as any;
  const { id } = looseParams;
  const { data: tokenData } = useQuery(checkTokenQueryOptions);
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
      <ManageUserScreenHeader name={props.defaultValues?.name} />
      <div className="mt-5">
        <div className="w-[300px] flex justify-center mx-auto">
          <AvatarChanger
            userId={+id}
            currentAvatarUrl={props.defaultValues?.pictureUrl}
            onSuccess={() => {
              queryClient.invalidateQueries({
                queryKey: [QueryKeys.USER_LIST, tokenData?.user?.email],
              });
            }}
          />
        </div>

        <UserForm editMode={props.editMode} ref={formRef} />
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </main>
  );
};
