import { ManageRoleScreen } from "@/components/screens/profile/ManageProfileScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/credentials/profiles/create")({
  component: () => <ManageRoleScreen />,
});
