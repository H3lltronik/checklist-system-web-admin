import { ManageChecklistScreen } from "@/components/screens/checklist/ManageChecklistScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/file-checklist/create")({
  component: AdminManageChecklistScreen,
});

function AdminManageChecklistScreen() {
  return <ManageChecklistScreen />;
}
