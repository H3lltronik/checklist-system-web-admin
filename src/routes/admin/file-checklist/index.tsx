import { queryClient } from "@/components/core/queryClient";
import { checklistQueryOptions } from "@/components/screens/checklist/checklist-queries";
import { ChecklistScreen } from "@/components/screens/checklist/ChecklistScreen";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  const data = await queryClient.ensureQueryData(checklistQueryOptions);
  return data;
};

export const Route = createFileRoute("/admin/file-checklist/")({
  component: AdminChecklistScreen,
  loader,
});

function AdminChecklistScreen() {
  return <ChecklistScreen />;
}
