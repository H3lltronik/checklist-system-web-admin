import { queryClient } from "@/components/core/queryClient";
import { AssignationListScreen } from "@/components/screens/assignation/AssignationListScreen";
import { assignationQueryOptions } from "@/components/screens/assignation/queries";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  const data = await queryClient.ensureQueryData(assignationQueryOptions);
  return data;
};

export const Route = createFileRoute("/admin/assignations/")({
  component: AdminChecklistScreen,
  loader,
});

function AdminChecklistScreen() {
  return <AssignationListScreen />;
}
