import { ManageAssignationScreen } from "@/components/screens/assignation/ManageAssignationScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/assignations/create")({
  component: AdminManageAssignationScreen,
});

function AdminManageAssignationScreen() {
  return <ManageAssignationScreen />;
}
