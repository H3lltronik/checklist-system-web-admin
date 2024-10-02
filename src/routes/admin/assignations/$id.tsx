import { queryClient } from "@/components/core/queryClient";
import { AssignationDetailsScreen } from "@/components/screens/assignation/AssignationDetailsScreen";
import { buildEnterpriseAssignationDetailsQueryOptions } from "@/components/screens/my-assignations/data/queries";
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

export const Route = createFileRoute("/admin/assignations/$id")({
  component: () => <AdminAssignationDetailsScreen />,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminAssignationDetailsScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildEnterpriseAssignationDetailsQueryOptions(Number(id)));

  if (!data) return <>No data</>;

  return <AssignationDetailsScreen data={data} />;
}
