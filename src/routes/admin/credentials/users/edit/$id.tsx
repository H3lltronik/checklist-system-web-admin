import { UserWEnterprises } from "@/@types/api/user";
import { queryClient } from "@/components/core/queryClient";
import { buildUserDetailsQueryOptions } from "@/components/screens/users/data/queries";
import { UserFormReturns } from "@/components/screens/users/forms/UserForm";
import { ManageUserScreen } from "@/components/screens/users/ManageUserScreen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  if (!params.id) return null;
  const data = await queryClient.ensureQueryData(buildUserDetailsQueryOptions(Number(params.id)));
  return data;
};

export const Route = createFileRoute("/admin/credentials/users/edit/$id")({
  component: () => <AdminUserDetailsScreen />,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminUserDetailsScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildUserDetailsQueryOptions(Number(id))) as {
    data: UserWEnterprises;
  };

  const parsedData: UserFormReturns = {
    id: Number(data.id),
    name: data.name,
    pictureUrl: data.pictureUrl,
    enterprises: data.enterprises.map((enterprise) => ({
      enterpriseId: enterprise.id,
    })),
    credential: {
      ...data.credentials[0],
      repeatPassword: "",
      password: "",
    },
  };

  return <ManageUserScreen editMode={true} defaultValues={parsedData} />;
}
