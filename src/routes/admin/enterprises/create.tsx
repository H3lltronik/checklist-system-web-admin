import { ManageEnterpriseScreen } from "@/components/screens/enterprise/ManageEnterpriseScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/enterprises/create")({
  component: AdminManageEnterpriseScreen,
});

function AdminManageEnterpriseScreen() {
  return <ManageEnterpriseScreen />;
}
