import { queryClient } from "@/components/core/queryClient";
import { buildRoleDetailsQueryOptions } from "@/components/screens/profile/data/role/queries";
import { ManageRoleScreen } from "@/components/screens/profile/ManageProfileScreen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  if (!params.id) return null;
  const data = await queryClient.ensureQueryData(buildRoleDetailsQueryOptions(Number(params.id)));
  return data;
};

export const Route = createFileRoute("/admin/credentials/profiles/edit/$id")({
  component: () => <AdminProfileDetailsScreen />,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminProfileDetailsScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildRoleDetailsQueryOptions(Number(id)));

  if (!data) return <>No data</>;

  return <ManageRoleScreen defaultValues={data} />;
}
