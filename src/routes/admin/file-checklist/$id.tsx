import { FileChecklist } from "@/@types/api/entities";
import { queryClient } from "@/components/core/queryClient";
import { buildChecklistDetailsQueryOptions } from "@/components/screens/checklist/checklist-queries";
import { ChecklistDetailsScreen } from "@/components/screens/checklist/ChecklistDetailsScreen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  if (!params.id) return null;
  const data = await queryClient.ensureQueryData(
    buildChecklistDetailsQueryOptions(Number(params.id)),
  );
  return data;
};

export const Route = createFileRoute("/admin/file-checklist/$id")({
  component: () => <AdminChecklistDetailsScreen />,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminChecklistDetailsScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildChecklistDetailsQueryOptions(Number(id))) as {
    data: FileChecklist;
  };

  return <ChecklistDetailsScreen data={data} />;
}
