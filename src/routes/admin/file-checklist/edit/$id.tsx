import { queryClient } from "@/components/core/queryClient";
import { buildChecklistDetailsQueryOptions } from "@/components/screens/checklist/checklist-queries";
import { ManageChecklistScreen } from "@/components/screens/checklist/ManageChecklistScreen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  if (!params.id) return null;
  const queryOptions = buildChecklistDetailsQueryOptions(Number(params.id));
  const data = await queryClient.ensureQueryData(queryOptions);

  return data;
};

export const Route = createFileRoute("/admin/file-checklist/edit/$id")({
  component: AdminManageChecklistScreen,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminManageChecklistScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildChecklistDetailsQueryOptions(Number(id)));

  return <ManageChecklistScreen defaultValues={data} />;
}
