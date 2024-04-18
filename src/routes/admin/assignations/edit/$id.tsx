import { queryClient } from "@/components/core/queryClient";
import { ManageAssignationScreen } from "@/components/screens/assignation/ManageAssignationScreen";
import { buildAssignationDetailsQueryOptions } from "@/components/screens/assignation/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  if (!params.id) return null;
  const queryOptions = buildAssignationDetailsQueryOptions(Number(params.id));
  const data = await queryClient.ensureQueryData(queryOptions);

  return data;
};

export const Route = createFileRoute("/admin/assignations/edit/$id")({
  component: AdminManageAssignationScreen,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminManageAssignationScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildAssignationDetailsQueryOptions(Number(id)));

  if (!data) return <>No data</>;

  return <ManageAssignationScreen defaultValues={data} />;
}
