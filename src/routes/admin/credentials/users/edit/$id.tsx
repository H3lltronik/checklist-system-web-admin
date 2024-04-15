import { UserWEnterprises } from "@/@types/api/user";
import { queryClient } from "@/components/core/queryClient";
import { buildUserDetailsQueryOptions } from "@/components/screens/users/data/queries";
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

  const parsedData = {
    id: Number(data.id),
    email: data.email,
    password: data.password,
    repeatPassword: data.password,
    roleId: data.roleId,
    enterprises: data.enterprises.map((enterprise) => ({
      enterpriseId: enterprise.id,
    })),
  };

  return <ManageUserScreen editMode={true} defaultValues={parsedData} />;
}
