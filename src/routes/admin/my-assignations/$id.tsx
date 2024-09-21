import { queryClient } from "@/components/core/queryClient";
import { buildEnterpriseAssignationDetailsQueryOptions } from "@/components/screens/my-assignations/data/queries";
import { MyAssignationDetailsScreen } from "@/components/screens/my-assignations/details/MyAssignationDetailsScreen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  if (!params.id) return null;
  const data = await queryClient.ensureQueryData(
    buildEnterpriseAssignationDetailsQueryOptions(Number(params.id)),
  );
  return data;
};

export const Route = createFileRoute("/admin/my-assignations/$id")({
  component: () => <AdminEnterpriseAssignationDetailsScreen />,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminEnterpriseAssignationDetailsScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildEnterpriseAssignationDetailsQueryOptions(Number(id)));

  if (!data) return <>No data</>;

  console.log("[AdminEnterpriseAssignationDetailsScreen] data", data);

  return <MyAssignationDetailsScreen data={data} />;
}
