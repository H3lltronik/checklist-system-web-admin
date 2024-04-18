import { queryClient } from "@/components/core/queryClient";
import { ManageEnterpriseScreen } from "@/components/screens/enterprise/ManageEnterpriseScreen";
import { buildEnterpriseDetailsQueryOptions } from "@/components/screens/enterprise/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  if (!params.id) return null;
  const queryOptions = buildEnterpriseDetailsQueryOptions(Number(params.id));
  const data = await queryClient.ensureQueryData(queryOptions);

  return data;
};

export const Route = createFileRoute("/admin/enterprises/edit/$id")({
  component: AdminManageEnterpriseScreen,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminManageEnterpriseScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildEnterpriseDetailsQueryOptions(Number(id)));

  if (!data) return <>No data</>;

  return <ManageEnterpriseScreen defaultValues={data} />;
}
